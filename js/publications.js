function pubBibtex2html(publications, bulletType = "number", sort = "default") {

	let entry = "";
    let entries = "";
    let vol_num_pgs = "";
    let doi_clean = "";
    let authors_split = "";

    let entry_ct = 1;
    if(sort == 'reverse') entry_ct = publications.length;

    for (const bibtex_entry of publications) {
    
		// Create div to hold each entry
		entries += "<div class='col-3 publication' >";

		//// Left column
		// Clear entry
		entry = "";

		// Get clean DOI if defined
		if(bibtex_entry['fields']['doi'] !== undefined) doi_clean = bibtex_entry['fields']['doi'].replace('https://doi.org/', '');

		// Add link to article
		if(bibtex_entry['fields']['pdf'] !== undefined){
			if(bibtex_entry['fields']['pdf'].toLowerCase() == 'on request'){
			}else{
				entry += '<a href="' + bibtex_entry['fields']['pdf'] + '" title="Go to the PDF for this article" target="_blank" >';
				entry += '<img class="icon" src="webp/Icon-PDF-black-and-white-on-transparent-32x32.webp" alt="Icon of document with the word PDF" ></img>';
				entry += '</a>';
			}
		}else if(bibtex_entry['fields']['url'] !== undefined){
			//entry += '<a href="' + bibtex_entry['fields']['url'] + '" title="Go to the webpage for this article" target="_blank" >';
			//entry += '<img class="icon" src="webp/Icon-link-black-and-white-on-transparent-32x32.webp" alt="Icon of document with the word LINK" ></img>';
			//entry += '</a>';
		}else if(bibtex_entry['fields']['doi'] !== undefined){
			//entry += '<a href="https://doi.org/' + doi_clean + '" title="Go to the webpage for this article" target="_blank" >';
			//entry += '<img class="icon" src="webp/Icon-link-black-and-white-on-transparent-32x32.webp" alt="Icon of document with the word LINK" ></img>';
			//entry += '</a>';
		}

		// Add entry to entries
		entries += "<div class='icon' >" + entry + "</div>";

		// Add number for entry
		entries += "<div class='number' >";
		if(bulletType == "bullet") {
			entries += "&#8226;";
		}else if(bulletType == "number") {
			entries += entry_ct + ".";
		}
		entries += "</div>";

		//// Right column
		// Clear Entry
		entry = "";

		if(bibtex_entry['fields']['author'] !== undefined){
			authors_split = bibtex_entry['fields']['author'].split(/ and | AND /);
			entry += formatBibtexAuthors(authors_split) + ' ';
		}

		if(bibtex_entry['fields']['year'] !== undefined){
			entry += '<strong>' + bibtex_entry['fields']['year'] + '</strong>. ';
		}

		if(bibtex_entry['fields']['title'] !== undefined){
			entry += (bibtex_entry['fields']['title'] + '. ').replace('?.', '?');
		}

		if(bibtex_entry['type'] == 'incollection'){

			entry += 'In ';

			if(bibtex_entry['fields']['editor'] !== undefined && bibtex_entry['fields']['editor'] !== ""){
				authors_split = bibtex_entry['fields']['editor'].split(/ and | AND /);
				entry += formatBibtexAuthors(authors_split);
				if(authors_split.length == 1){
					entry += ' (Ed.), ';
				}else{
					entry += ' (Eds.), ';
				}
			}
			if(bibtex_entry['fields']['booktitle'] !== undefined && bibtex_entry['fields']['booktitle'] !== ""){
				entry += '<em>' + bibtex_entry['fields']['booktitle'] + '</em>';
			}
			if(bibtex_entry['fields']['pages'] !== undefined && bibtex_entry['fields']['pages'] !== ""){
				if(bibtex_entry['fields']['pages'].includes('-')){
					entry += ' (pp. ' + bibtex_entry['fields']['pages'].replace(/--/, '-') + ').';
				}else{
					entry += ' (p. ' + bibtex_entry['fields']['pages'] + ').';
				}
			}else{
				entry += '.';
			}
			if(bibtex_entry['fields']['publisher'] !== undefined && bibtex_entry['fields']['publisher'] !== ""){
				entry += ' ' + bibtex_entry['fields']['publisher'] + '.';
			}

		}else{
			if(bibtex_entry['fields']['journal'] !== undefined){
				entry += '<em>' + bibtex_entry['fields']['journal'] + '</em>';
			}

			vol_num_pgs = "";
			if(bibtex_entry['fields']['volume'] !== undefined && bibtex_entry['fields']['volume'] !== ""){
				vol_num_pgs += bibtex_entry['fields']['volume'];
			}
			if(bibtex_entry['fields']['number'] !== undefined && bibtex_entry['fields']['number'] !== ""){
				vol_num_pgs += '(' + bibtex_entry['fields']['number'] + ')';
			}
			if(bibtex_entry['fields']['pages'] !== undefined && bibtex_entry['fields']['pages'] !== ""){
				if(bibtex_entry['fields']['pages'].includes('-')){
					vol_num_pgs += ', pp.' + bibtex_entry['fields']['pages'].replace(/--/, '-');
				}else{
					vol_num_pgs += ', p.' + bibtex_entry['fields']['pages'];
				}
			}
			if(vol_num_pgs == ""){
				entry += '.';
			}else{
				entry += '. ' + vol_num_pgs + '.';
			}
		}
	
		if(bibtex_entry['fields']['predoi'] !== undefined){
			entry += ' ' + (bibtex_entry['fields']['predoi'] + '.').trim().replace('..', '.');
		}

		if(bibtex_entry['fields']['doi'] !== undefined){
			entry += ' DOI: <a href="https://doi.org/' + doi_clean + '" target="_blank" >' + doi_clean + '</a>.';
		}else{
			if(bibtex_entry['fields']['url'] !== undefined){
				entry += ' URL: <a class="flex-item-url" href="' + bibtex_entry['fields']['url'] + '" target="_blank" >' + bibtex_entry['fields']['url'] + '</a>.';
			}
		}

		if(bibtex_entry['fields']['git'] !== undefined){
			entry += ' Github: <a class="flex-item-url" href="' + bibtex_entry['fields']['git'] + '" target="_blank" >' + bibtex_entry['fields']['git'] + '</a>.';
		}

		if(bibtex_entry['fields']['pdf'] !== undefined){
			if(bibtex_entry['fields']['pdf'].toLowerCase() == 'on request'){
				entry += ' PDF available upon request.';
			}else{
				//entry += ' PDF: <a href="' + bibtex_entry['fields']['pdf'] + '" target="_blank" >' + bibtex_entry['fields']['pdf'] + '</a>.';
			}
		}

		if(bibtex_entry['fields']['language'] !== undefined){
			if(bibtex_entry['fields']['language'] == 'fr'){
				entry += ' (in French)';
			}else if(bibtex_entry['fields']['language'] == 'ru'){
				entry += ' (in Russian)';
			}
		}

		// Add italic tags to entry
		entry = entry.replace(/\\textit\{(.*?)\}/g, '<em>$1</em>');

		// Add bold tags to entry
		entry = entry.replace(/\\textbf\{(.*?)\}/g, '<strong>$1</strong>');

		// Replace any "as is" text
		entry = entry.replace(/\{(.*?)\}/g, '$1');

		// Add entry to entries
		entries += "<div class='entry' >" + entry + "</div>";

		// Create div to hold each entry
		entries += "</div>";
		
		if(sort == 'reverse'){ entry_ct--; }else{ entry_ct++; }
		
	}

	return entries;
}

function formatBibtexAuthors(authors_split) {
	
	let author_formatted = "";
	let authors_formatted = "";
	let author_split = [];
	let author_lastname = "";
	let author_firstnames = [];
	let author_firstletters = [];

	let i = 0;
	
    for (const author of authors_split) {

    	// If string starts with {, preserve string as is
    	if(author[0] == "{"){

			author_formatted = author.replace(/^\{|\}$/g, '');
			
    	}else{

			// Split author name at delimiter
			if(author.includes(',')){

				// Split at , -- Names are Last name first
				author_split = author.split(",");

				// Trim whitespaces at ends of each entry
				author_split = author_split.map(item => item.trim());
			
				// Set author last name
				author_lastname = author_split[0];

				// Split first names
				author_firstnames = author_split.slice(1)[0].split(" ");

				// Trim whitespaces at ends of each entry
				author_firstnames = author_firstnames.map(item => item.trim());

			}else{

				// Split at whitespace -- Names are First name first
				author_split = author.split(" ");

				// Trim whitespaces at ends of each entry
				author_split = author_split.map(item => item.trim());

				// Set author last name
				author_lastname = author_split.at(-1);

				// Remove periods at end of any elements
				//author_split = author_split.map(item => item.replace(/.$/, ''));

				// Split first names
				author_firstnames = author_split.slice(0, -1);
			}

			// Get first letters of first names
			author_firstletters = author_firstnames.map(word => word[0]);

			// Last name and first letter of other names
			author_formatted = author_lastname + ', ' + author_firstletters.join('.') + '.';
    	}

    	// Check if author should be bolded
    	if(pubAuthorsBold.includes(author.replaceAll('.', ''))){
    		author_formatted = "<strong>" + author_formatted + "</strong>";
    	}
    	
    	// Add author to string
    	authors_formatted += author_formatted;

		// Add delimiter between authors
		if(i < authors_split.length-2){
			authors_formatted += ", ";
		}else if(i == authors_split.length-2){
			authors_formatted += " & ";
		}
    	
    	i++;
	}
	
	return authors_formatted;
}
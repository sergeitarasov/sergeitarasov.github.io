function softareYaml2Html(softwares) {

    let entries = "";
    let maintainer = "";
    let authors = "";

	// For each piece of software
	for (const software of softwares['software']) {

		entries += "<div class='software-entry' >";

			entries += "<div class='col-2 name-logo align-center' >";
				entries += "<div 'name' >";
					entries += "<h2>" + software['name'] + "</h2>";
				entries += "</div>";
				entries += "<div class='logo' >";
					if(software['logo'] !== undefined && software['logo'] !== ""){
						entries += '<img class="software-logo" src="' + software['logo'] + '" alt="Logo for ' + software['name'] + ' software" ></img>';
					}
				entries += "</div>";
			entries += "</div>";

			if(software['short_description'] !== undefined && software['short_description'] !== ""){
				entries += '<h3 class="short-description" >' + software['short_description'] + '</h3>';
			}

			entries += "<div class='quick-info' >";

				if(software['authors'] !== undefined && software['authors'] !== ""){

					// Read author list as Markdown, removing <p> tags at start and end
					authors = DOMPurify.sanitize(marked.parse( software['authors'] )).replace(/^<p>|<\/p>$/gi, '');

					entries += "<p><strong>Authors:</strong> " + authors + "</p>";
				}

				if(software['maintainer'] !== undefined && software['maintainer'] !== ""){

					// Read author list as Markdown, removing <p> tags at start and end
					maintainer = DOMPurify.sanitize(marked.parse( software['maintainer'] )).replace(/^<p>|<\/p>$/gi, '');

					entries += "<p><strong>Maintainer:</strong> " + maintainer + "</p>";
				}

				if(software['github'] !== undefined && software['github'] !== ""){
					entries += '<p><strong>Github:</strong> ';
					entries += '<a class="flex-item-url" href="' + software['github'] + '" title="Go to the Github page for ' + software['name'] + '" target="_blank" >';
					entries += software['github'];
					entries += '</a>';
					entries += '</p>';
				}

				if(software['doc_url'] !== undefined && software['doc_url'] !== ""){
					entries += '<p><strong>Documentation:</strong> ';
					entries += '<a class="flex-item-url" href="' + software['doc_url'] + '" title="Go to the documentation for ' + software['name'] + '" target="_blank" >';
					entries += software['doc_url'];
					entries += '</a>';
					entries += '</p>';
				}

			entries += "</div>";

			entries += "<div class='col-2-stack description-image' >";
				entries += "<div class='description' >";
						if(software['description'] !== undefined && software['description'] !== ""){
							entries += DOMPurify.sanitize(marked.parse( software['description'] ));
						}
				entries += "</div>";
				entries += "<div class='display-flex image' >";
						if(software['image'] !== undefined && software['image'] !== ""){
							entries += '<img class="software-feature" src="' + software['image'] + '" alt="Feature image for ' + software['name'] + ' software" ></img>';
						}
				entries += "</div>";
			entries += "</div>";

			if(software['publications'] !== undefined && software['publications'] !== ""){
				entries += "<h3>Related publications</h3>";
				entries += pubBibtex2html(parseBibTeX(software['publications']), 'bullet');
			}

		entries += "</div>";
	}

	return entries;
}
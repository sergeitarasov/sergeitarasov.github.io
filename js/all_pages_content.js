// Create global pageYaml object
let pageYaml = "";

// Set author names to make bold, removing any "." characters with initials for matching
let pubAuthorsBold = yamlData['all_pages']['namestobold'].map(str => str.replaceAll('.', ''));

function setPageYaml() {

	// Search site map for matching page
	if(subpage_name == undefined){
	
		for (const page of yamlData['all_pages']['sitemap']['first']) {
			if(page['link'] == webpage_file) { pageYaml = page;	}
		}

	}else{
	
		// Set page heading
		for (const page of yamlData['all_pages']['sitemap']['first']) {
			if(page['link'] == webpage_type + '.html') { pageYaml = page;	}
		}
		
		// Set page subheading
		for (const page of yamlData['all_pages']['sitemap']['second'][webpage_type]) {
			if(page['link'] == webpage_type + '/' + webpage_file) { pageYaml = page;	}
		}
	}

	// Update window title
	document.title = 'Tarasov Lab - ' + pageYaml['title'];
}

function writeMain() {

	// Get the main element
	const mainElement = document.querySelector('main');

	// Add content
	if(webpage_type == 'trips' && subpage_name != undefined){
	
		// Create a new section element
		newTitleSection = document.createElement('section');
		newTitleSection.classList.add('page-title', 'heading', 'flex-column', 'trip');

		// Add background image to section
		newTitleSection.style.backgroundPositionX = pageYaml['title_image_position_x'];
		newTitleSection.style.backgroundPositionY = '50px'; // Top 50px are always hidden by the header
		newTitleSection.style.backgroundImage = pageYaml['title_image'];
		newTitleSection.style.backgroundAttachment = 'fixed';
		newTitleSection.style.backgroundSize = 'auto 440px';
		newTitleSection.style.backgroundRepeat = 'no-repeat';

		// Create headings
		newHeading = document.createElement('h1');
		newHeading.innerHTML = pageYaml['title'];
		newTitleSection.appendChild(newHeading);

		// Create headings
		newHeading = document.createElement('span');
		newHeading.classList.add('subheading');
		newHeading.innerHTML = pageYaml['name'];
		newTitleSection.appendChild(newHeading);

		// Add citation for page title background image
		newCaption = document.createElement('figcaption');
		newCaption.classList.add('on-dark');
		newCaption.innerHTML = '<a href="' + pageYaml['title_image_caption_link'] + '" target="_blank">' + pageYaml['title_image_caption'] + '</a>';
		newTitleSection.appendChild(newCaption);

		// Append the new content to the main element
		mainElement.appendChild(newTitleSection);


		// Create a new section element
		newSection = document.createElement('section');
		newSection.classList.add('content', 'trip');

		newDiv = document.createElement('div');
		newDiv.classList.add('container', 'narrow-content-width', 'trip');

		// Create a new article element
		newArticle = document.createElement('article');
		newArticle.classList.add('trip');
		
		// Add html
		newArticle.innerHTML = DOMPurify.sanitize(marked.parse( mdData[subpage_name] ));

		// Append the new content to the main element
		newDiv.appendChild(newArticle);
		newSection.appendChild(newDiv);
		mainElement.appendChild(newSection);

	}else{

		// Create a heading/title section element
		newTitleSection = document.createElement('section');
		newTitleSection.classList.add('page-title', 'heading', 'flex-column', webpage_type);

		// Set page title background image size
		if (webpage_type == 'index'){
			background_size = 'auto 590px';
		}else{
			background_size = 'auto 440px';
		}

		// Add background image to section
		newTitleSection.style.backgroundPositionX = pageYaml['title_image_position_x'];
		newTitleSection.style.backgroundPositionY = '50px'; // Top 50px are always hidden by the header
		newTitleSection.style.backgroundImage = pageYaml['title_image'];
		newTitleSection.style.backgroundAttachment = 'fixed';
		newTitleSection.style.backgroundSize = background_size;
		newTitleSection.style.backgroundRepeat = 'no-repeat';

		if (webpage_type == 'index'){

			newHeadingDiv = document.createElement('div');
			newHeadingDiv.classList.add('page-title', 'heading', webpage_type);

			newHeading = document.createElement('h1');
			newHeading.innerHTML = 'The Tarasov Lab';
			newHeadingDiv.appendChild(newHeading);

			newUnderHeading = document.createElement('h2');
			newUnderHeading.classList.add('underheading');
			newUnderHeading.innerHTML = 'Finnish Museum of Natural History';
			newHeadingDiv.appendChild(newUnderHeading);

			newHeading = document.createElement('span');
			newHeading.classList.add('subheading');
			newHeading.innerHTML = pageYaml['subtitle'];
			newHeadingDiv.appendChild(newHeading);

			newTitleSection.appendChild(newHeadingDiv);

		}else{
			newHeading = document.createElement('h1');
			newHeading.innerHTML = pageYaml['title'];
			newTitleSection.appendChild(newHeading);

			if(pageYaml['subtitle'] != undefined){
				newHeading = document.createElement('span');
				newHeading.classList.add('subheading');
				newHeading.innerHTML = pageYaml['subtitle'];
				newTitleSection.appendChild(newHeading);
			}
		}


		// Add citation for page title background image
		newCaption = document.createElement('figcaption');
		newCaption.classList.add('on-dark');
		if(pageYaml['title_image_caption_link'] != undefined && pageYaml['title_image_caption_link'] != null){
			newCaption.innerHTML = '<a href="' + pageYaml['title_image_caption_link'] + '" target="_blank">' + pageYaml['title_image_caption'] + '</a>';
		}else{
			newCaption.innerHTML = pageYaml['title_image_caption'];
		}
		newTitleSection.appendChild(newCaption);
		mainElement.appendChild(newTitleSection);

		if (webpage_type == 'index'){

			// Add parsed index yaml to main element
			mainElement.innerHTML = mainElement.innerHTML + indexYaml2Html(yamlData['index']);

		} else {

			// Create a new section element
			newContentSection = document.createElement('section');
			newContentSection.classList.add('content', webpage_type);

			// Create an div for content width for all pages except index/home
			newDiv = document.createElement('div');
			newDiv.classList.add('container', 'narrow-content-width', webpage_type);

			if(webpage_type == 'index'){

			}else if(webpage_type == 'trips' && subpage_name == undefined){

				// Add html
				newDiv.classList.add('flex-column', 'align-center');
				newDiv.innerHTML = tripsYaml2Html(yamlData['all_pages']['sitemap']['second']['trips']);

			}else if(webpage_type == 'people'){

				// Add html
				newDiv.innerHTML = peopleYaml2Html(yamlData['people']);

			}else if(webpage_type == 'projects'){

				// Add html
				newDiv.innerHTML = projectsYaml2Html(yamlData['projects']);

			}else if(webpage_type == 'publications'){

				// Add publications html to list element
				newDiv.innerHTML = pubBibtex2html(bibData['publications'], 'number', 'reverse');

			}else if(webpage_type == 'software'){

				// Add html
				newDiv.innerHTML = softareYaml2Html(yamlData['software']);

			}else { // Ex: Attributions, Facts about dung beetles

				// Add html
				if(mdData[webpage_type] != undefined && mdData[webpage_type] != null){
					newDiv.innerHTML = DOMPurify.sanitize(marked.parse( mdData[webpage_type] ));
				}
			}

			// Append the new content to the main element
			newContentSection.appendChild(newDiv);
			mainElement.appendChild(newContentSection);
		}
	}

	return;
}

function writeHeader() {

	// Start variable to hold content
	let lines = "";
	const rootElement = document.documentElement; // Targets the <html> element
	const currentScheme = getComputedStyle(rootElement).colorScheme;

	// Add content
	lines += '<a class="logo" href="' + webpage_level + 'index.html" title="Return to the homepage" >';
	lines += '<div class="logo" >';
	lines += '<img src="' + webpage_level + 'webp/Header-Onthophagus-logo-w-shadow-on-transparent-cropped-200x127.webp" ></img>';
	lines += '<span>The Tarasov Lab</span>';
	lines += '</div>';
	lines += '</a>';

	// Hidden checkbox for the click state
	lines += '<input type="checkbox" id="nav-toggle" class="nav-toggle">';

	// Hamburger button linked to the checkbox
	lines += '<label title="Show/Hide site navigation" for="nav-toggle" class="nav-toggle-label">';
	lines += '	<span></span>';
	lines += '</label>';

	lines += writeSiteNav(yamlData['all_pages']['sitemap']['first'], 'header');
	
	// Add to header element
	document.getElementsByTagName("header")[0].innerHTML = lines;

	// Add class to header element
	document.getElementsByTagName("header")[0].classList.add('site-header');

	const toggleBtn = document.getElementById('theme-toggle');

	if(debug){

		toggleBtn.addEventListener('click', () => {

			// Get the current computed color-scheme
			const currentScheme = getComputedStyle(rootElement).colorScheme;

			// Change the theme to the opposite of what it currently is
			if (currentScheme === 'dark') {
				rootElement.style.colorScheme = 'light';
				toggleBtn.innerHTML = '&#9790;';
				toggleBtn.title = 'Change to dark color scheme';
				toggleBtn.classList.add('dark');
				toggleBtn.classList.remove("light");
			} else {
				rootElement.style.colorScheme = 'dark';
				toggleBtn.innerHTML = '&#x2600;';
				toggleBtn.title = 'Change to light color scheme';
				toggleBtn.classList.add('light');
				toggleBtn.classList.remove("dark");
			}
		});
	}

	return;
}

function writeSiteNav(sitemap, type) {

	// Start variable to hold content
	let lines = "";
	const rootElement = document.documentElement; // Targets the <html> element
	const currentScheme = getComputedStyle(rootElement).colorScheme;

	lines += "<nav>";
	lines += "<ul>";

	// For each page in the sitemap
    for (const page of sitemap) {
    
    	if(page['show_in_nav'] == false) continue;
    
		lines += '<li><a href="' + webpage_level + page['link'] + '" title="Go to the ' + page['title'] + ' page" >' + page['title'] + '</a></li>';
	}

	// Add moon/sun for light dark mode
	if(debug == true && type == 'header'){
		lines += '<li><button id="theme-toggle" title="Change to ';
		if(currentScheme === 'dark'){ lines += 'light'; }else{ lines += 'dark'; }
		lines += '  color scheme" class="theme-toggle '
		if(currentScheme === 'dark'){ lines += 'light'; }else{ lines += 'dark'; }
		lines += '">';
		if(currentScheme === 'dark'){ lines += '&#x2600;'; }else{ lines += '&#9790;'; }
		lines += '</button></li>';
	}

	lines += "</ul>";
	lines += "</nav>";

	return lines;
}

function writeFooter() {

	// Start variable to hold content
	let lines = "";
	
	// Add content
	lines += "<div class='top-row col-3-stack' >";
		lines += "<div class='left' >";
			lines += '<h3>The Tarasov Lab</h3>';
			lines += "<span>Any opinions, findings, conclusions or recommendations expressed on this site are those of the Tarasov Lab and do not necessarily reflect the views of the agencies that have funded our lab's research.</span>";
		lines += "</div>";

		lines += "<div class='middle' >";
			lines += "<div>";
				lines += '<h3>Site navigation</h3>';
				lines += writeSiteNav(yamlData['all_pages']['sitemap']['first'], 'footer');
			lines += "</div>";
		lines += "</div>";

		lines += "<div class='right' >";
			lines += "<div>";
				lines += '<h3>Our location</h3>';
				lines += '<span>Finnish Museum of Natural History (LUOMUS)<br>';
				lines += 'P.O. Box 17 (Pohjoinen Rautatiekatu 13)<br>';
				lines += 'FI-00014 University of Helsinki<br>';
				lines += 'Finland</span>';
			lines += "</div>";
			
			lines += '<div class="icon-text-container">';
				lines += '<span>Follow us on:</span>';
				lines += '<a class="icon" href="https://x.com/tarasov_sergio" title="Go to the Tarasov Lab channel on X" target="_blank" >';
				lines += '<svg class="icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 256 256" xml:space="preserve" >';
					lines += '<g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">';
						lines += '<circle class="white-in-light" cx="45" cy="45" r="40" fill="black" />';
						lines += '<polygon class="black-in-light" points="24.89,23.01 57.79,66.99 65.24,66.99 32.34,23.01 " style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: white; fill-rule: nonzero; opacity: 1;" transform="  matrix(1 0 0 1 0 0) "/>';
						lines += '<path class="black-in-light" d="M 45 0 L 45 0 C 20.147 0 0 20.147 0 45 v 0 c 0 24.853 20.147 45 45 45 h 0 c 24.853 0 45 -20.147 45 -45 v 0 C 90 20.147 69.853 0 45 0 z M 56.032 70.504 L 41.054 50.477 L 22.516 70.504 h -4.765 L 38.925 47.63 L 17.884 19.496 h 16.217 L 47.895 37.94 l 17.072 -18.444 h 4.765 L 50.024 40.788 l 22.225 29.716 H 56.032 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: white; fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round"/>';
					lines += '</g>';
				lines += '</svg>';
				lines += '</a>';
			lines += "</div>";
		lines += "</div>";
	lines += "</div>";

	lines += "<div class='bottom-row flex-column'>";
		lines += "<div>";
		lines += "© " + new Date().getFullYear() + " Tarasov Lab";
		lines += "</div>";

		lines += "<div>";
		lines += "Site designed by <a href=\"https://3danatomystudios.com/\" target=\"_blank\"> 3D Anatomy Studios</a> and maintained by the Tarasov Lab with <a href='" + webpage_level + "attributions.html' >these attributions</a>.";
		lines += "</div>";
	lines += "</div>";

	// Add to footer element
	document.getElementsByTagName("footer")[0].innerHTML = lines;

	return;
}

setPageYaml();
writeMain();
writeFooter();
writeHeader();
function projectsYaml2Html(projects) {

    let entries = "";

	// For each piece of software
	for (const project of projects['projects']) {

		entries += "<div class='project-entry' >";

			entries += "<h2 class='name' >" + project['name'] + "</h2>";

			if(project['short_description'] !== undefined && project['short_description'] !== ""){
				entries += "<h3 class='short-description' >" + project['short_description'] + "</h3>";
			}

			entries += "<div class='col-2-stack description-image' >";
				entries += "<div class='description' >";

					if(project['description'] !== undefined && project['description'] !== ""){
						entries += DOMPurify.sanitize(marked.parse( project['description'] ));
					}

				entries += "</div>";
				entries += "<div class='display-flex image' >";

					if(project['image'] !== undefined && project['image'] !== "" && project['image'] !== null){

						entries += '<figure class="img" >';
						entries += '<img class="project-feature" src="' + project['image'] + '" alt="Feature image for ' + project['name'] + ' project" ></img>';

						if(project['image_caption'] !== undefined && project['image_caption'] !== "" && project['image_caption'] !== null){

							entries += "<figcaption class='right on-light' >";

							if(project['image_caption_link'] !== undefined && project['image_caption_link'] !== "" && project['image_caption_link'] !== null){
								entries += "<a href='" + project['image_caption_link'] + "' target='_blank' title='" + project['image_caption_link_title'] + "' >";
							}

							entries += project['image_caption'];

							if(project['image_caption_link'] !== undefined && project['image_caption_link'] !== "" && project['image_caption_link'] !== null){
								entries += "</a>";
							}

							entries += "</figcaption>";
						}

						entries += '</figure>';
					}

				entries += "</div>";
			entries += "</div>";

			if(project['publications'] !== undefined && project['publications'] !== ""){
				entries += "<h3>Recent publications related to this project</h3>";
				entries += pubBibtex2html(parseBibTeX(project['publications']), 'bullet');
			}

		entries += "</div>";

	}

	return entries;
}
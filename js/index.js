function indexYaml2Html(yaml_data) {

    let entries = "";
    let section_ct = 1;

	// For each section/block on the homepage
    for (const page_section of yaml_data['sections']) {

		entries += "<section class='col-2-stack content index' >";
			entries += "<div class='container wide-content-width' >";
				entries += "<div class='left-col remove-on-narrow' >";

				if (section_ct % 2 !== 0) { // Number is odd

					entries += "<div class='img narrow-order-to-1' >";
						entries += "<figure class='img' >";
							entries += "<img class='index-feature-content' src='" + page_section['image'] + "'></img>";
							entries += "<figcaption class='center on-light' >";
							if(page_section['image_caption_link'] != undefined && page_section['image_caption_link'] != null){
								entries += "<a href='" + page_section['image_caption_link'] + "' target='_blank' title='" + page_section['iamge_caption_link_title'] + "' >";
							}
							entries += page_section['image_caption'];
							if(page_section['image_caption_link'] != undefined && page_section['image_caption_link'] != null){
								entries += "</a>";
							}
							entries += "</figcaption>";
						entries += "</figure>";
					entries += "</div>";
				entries += "</div>";
				entries += "<div class='right-col remove-on-narrow' >";
					entries += "<div class='text narrow-order-to-0' >";
						entries += "<h2>" + page_section['heading'] + "</h2>";
						entries += "<p class='size-4' >" + page_section['description'] + "</p>";
					entries += "</div>";
					entries += "<div class='link narrow-order-to-2' >";
						entries += "<a class='button' href='" + page_section['button_link'] + "' title='" + page_section['button_link_title'] + "' >" + page_section['button_text'] + "</a>";
					entries += "</div>";

				}else{ // Number is even

					entries += "<div class='text narrow-order-to-0' >";
						entries += "<h2>" + page_section['heading'] + "</h2>";
						entries += "<p class='size-4' >" + page_section['description'] + "</p>";
					entries += "</div>";
					entries += "<div class='link narrow-order-to-2' >";
						entries += "<a class='button' href='" + page_section['button_link'] + "' title='" + page_section['button_link_title'] + "' >" + page_section['button_text'] + "</a>";
					entries += "</div>";
				entries += "</div>";
				entries += "<div class='right-col remove-on-narrow' >";
					entries += "<div class='img narrow-order-to-1' >";
						entries += "<figure class='img' >";
							entries += "<img class='index-feature-content' src='" + page_section['image'] + "'></img>";
							entries += "<figcaption class='center on-light' >";
							if(page_section['image_caption_link'] != undefined && page_section['image_caption_link'] != null){
								entries += "<a href='" + page_section['image_caption_link'] + "' target='_blank' title='" + page_section['iamge_caption_link_title'] + "' >";
							}
							entries += page_section['image_caption'];
							if(page_section['image_caption_link'] != undefined && page_section['image_caption_link'] != null){
								entries += "</a>";
							}
							entries += "</figcaption>";
						entries += "</figure>";
					entries += "</div>";
				}

				entries += "</div>";
			entries += "</div>";
		entries += "</section>";
		
		section_ct++;
	}

	return entries;
}

function tripsYaml2Html(trips) {

    let entries = "";

	// For each trip
    for (const trip of trips) {

		if(trip['show_in_trips'] == false) continue;
		
		entries += '<a href=' + trip['link'] + ' title="Go to the page for the trip ' + trip['name'] + '" >';

			entries += "<div class='col-2-stack trips' >";
				entries += "<div class='left-col flex-column' >";

					if(trip['preview_image'] !== undefined && trip['preview_image'] !== "" && trip['preview_image'] !== null){
						entries += '<img class="trip-feature" src="' + trip['preview_image'] + '" alt="Feature image for ' + trip['name'] + ' trip" ></img>';
					}

				entries += "</div>";
				entries += "<div class='right-col flex-column' >";

					entries += "<h2>" + trip['name'] + "</h2>";

					if(trip['blurb'] !== undefined && trip['blurb'] !== "" && trip['blurb'] !== null){
						entries += "<p>" + trip['blurb'] + "</p>";
					}

				entries += "</div>";
			entries += "</div>";

		entries += "</a>";

	}

	return entries;
}

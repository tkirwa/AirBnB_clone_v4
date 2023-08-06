$(document).ready(function () {
    $('.amenities .popover ul li input').click(function () {
	const amenitiesId = [];
	const amenitiesName = [];
	$.each($('.amenities .popover ul li input:checked'), function () {
	    amenitiesId.push(this.dataset.id);
	    amenitiesName.push(this.dataset.name);
	});
	$('.amenities h4').text(amenitiesName.join(', '));
    });
	
	/* Get Status */
	$.ajax({
		type: "GET",
		url: "http://localhost:5001/api/v1/status/",
		success: function (response) {
			$('div#api_status').addClass('available');
		},
		error: function (xhr) { 
			$('div#api_status').removeClass('available');
		}
	});

	/* Get users */
	const users = {};
	$.getJSON('http://localhost:5001/api/v1/users/',
	function (data) {
		for (const user of data) {
			users[user.id] = user.first_name + ' ' + user.last_name;
			}
		}
	);

	/* Get Places */
	$.ajax({
		type: "POST",
		url: "http://localhost:5001/api/v1/places_search/",
		contentType: 'application/json',
		dataType: "json",
		data: '{}',
		success: function (response) {
			content = '';
			for(const i of response)
			{
				content += '<article>';

				content += '<div class="title_box">';
				content += '<h2>' + i.name + '</h2>';
				content += '<div class="price_by_night">' + i.price_by_night + '</div>';
				content += '</div>';

				content += '<div class="information">';
				content += '<div class="max_guest">' + i.max_guest + '</div>';
				content += '<div class="number_rooms">' + i.number_rooms + '</div>';
				content += '<div class="number_bathrooms">' + i.number_bathrooms + '</div>';
				content += '</div>';

				content += '<div class="user">';
				content += '<b>Owner:</b> ' + users[i.user_id];
				content += '</div>';

				content += '<div class="description">';
				content +=  i.description;
				content += '</div>';

				content += '</article>';
			}
			
			$(content).appendTo('section.places');
		}
	});

	

});

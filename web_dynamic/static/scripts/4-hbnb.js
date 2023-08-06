$(document).ready(function () {
	const ids = []
    $('.amenities .popover ul li input').click(function () {
		ids.splice(0, ids.length);
		const amenitiesId = [];
		const amenitiesName = [];
		$.each($('.amenities .popover ul li input:checked'), function () {
			
			amenitiesId.push(this.dataset.id);
			amenitiesName.push(this.dataset.name);
		});
		$('.amenities h4').text(amenitiesName.join(', '));
		for(const id of amenitiesId){
			ids.push(id);
		}
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
	function places_search(data) {
		$.ajax({
			type: "POST",
			url: "http://localhost:5001/api/v1/places_search/",
			contentType: 'application/json',
			dataType: "json",
			data: JSON.stringify(data),
			success: response => {
				for(const i of response)
				{
					const content = '<article>\
						<div class="title_box">\
							<h2>' + i.name + '</h2>\
							<div class="price_by_night">' + i.price_by_night + '</div>\
						</div>\
						\
						<div class="information">\
							<div class="max_guest">' + i.max_guest + ' Guests</div>\
							<div class="number_rooms">' + i.number_rooms + ' Rooms</div>\
							<div class="number_bathrooms">' + i.number_bathrooms + ' Bathrooms </div>\
						</div>\
						\
						<div class="user">\
							<b>Owner:</b>' + users[i.user_id] + '\
						</div>\
						\
						<div class="description">' + i.description + '</div>\
						\
					</article>';
					$('section.places').append(content);
				}
				
				
			}
		});
	}
	places_search({});

	$('button').click(function () { 
		$('section.places').empty();
		amenities = {"amenities": ids}
		console.log(amenities);
		places_search(amenities);
	});
});

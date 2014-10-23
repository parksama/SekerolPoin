!(function( $ ) {
 
	$.fn.sekerolPoin = function( poinClass ) {
 		
 		var sekerol_target = this;

		var poins = updatePoin();

		$(window).on('resize', function(event) {
			poins = updatePoin();
		});

		$('body').bind('mousewheel', function(e){
			if(e.originalEvent.wheelDelta < 0) {
				// console.log('Down');
				sekerol('bawah');

			}else {
				// console.log('Up');
				sekerol('atas');
			}

			return false;
		});

		// $(document).scroll(function(event) {
		// 	sekerol('bawah');
		// });

		var boleh = true;

		function sekerol(arah)
		{
			if(boleh == true)
			{
				boleh = false;

				var index_now = poins.indexOf($('body').scrollTop());

				// handle untuk poin tidak terdaftar
				if(index_now == -1)
				{
					var selisih = poins[poins.length-1];
					var sekarang = $('body').scrollTop();
					$.each(poins, function(index, val) {
						// console.log(val + " " + sekarang);
						if(Math.abs(sekarang-val) < selisih)
						{
							selisih = Math.abs(sekarang-val);
							if(sekarang > val)
							{
								index_now = (arah == 'atas') ? index + 1 : index;
							}
							else
							{
								index_now = (arah == 'bawah') ? index - 1 : index;
							}
						}
					});
				}

				// menentukan tujuan atas dan bawah
				var atas = (index_now > 0) ? poins[index_now - 1] : poins[0];
				var bawah = (index_now < poins.length-1) ? poins[index_now + 1] : poins[poins.length-1];
				// console.log( index_now + " " + atas + " " + bawah);

				var poin_sekerol = (arah == 'atas') ? atas : bawah;

				$(sekerol_target).animate({
					scrollTop: poin_sekerol},
					500, function() {
						boleh = true;
				});
			}
		}

		function updatePoin()
		{
			var elem_poins = $('.'+poinClass);
			var poins = [];
			$.each(elem_poins, function(index, val) {
				poins.push( $(val).position().top );
			});

			return poins;
		}
 		
	};
 
}( jQuery ));
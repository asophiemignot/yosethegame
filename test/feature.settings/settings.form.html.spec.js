var form	= require('../../public/feature.settings/display.settings.request');
var cheerio = require('cheerio');
var Data	= require('../support/database.with.levels');

describe('Settings form', function() {
	
	var database = new Data();
	var response = {
		write: function(content) { this.html = content; },
		end: function() {}
	};
	
	describe('The elements of the page:', function() {

		beforeEach(function() {	
		    database.players = [ { login: 'ericminio', avatar: 'http://old-avatar' } ];
			form( { url: '/players/ericminio/settings' }, response, database );
			page = cheerio.load(response.html);
		});

		describe('avatar input field', function() {
		    
    		it('exists', function() {			
    			expect(page('input#avatar-url').length).toEqual(1);
    		});	
    		
    		it('proposes old value', function() {
    		   expect(page('input#avatar-url').attr('value')).toEqual('http://old-avatar'); 
    		});

		});
		
		it('has a button to trigger the save', function() {
			expect(page('button#save-settings-button').length).toEqual(1);
		});	
						
	});
});
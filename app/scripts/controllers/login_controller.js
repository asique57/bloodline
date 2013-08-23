Bloodline.LoginController = Ember.Controller.extend({

	login: function(){
		console.log('LoginController:login');
		/**
		 * This method invokes Facebook login method. If the login is successful 
		 * it calls the onSuccess method.
		 */
		var self = this;
		FB.login(function(response) {
			console.log(response);
			console.log("Login call response: %s",response.authResponse);
			
		    if (response.authResponse) {
		  //       FB.api('/me', function(response) {
				//   alert(response.name);
				// });
				self.onSuccess();
		    } else {
		        alert('Login Failed');
		    }
		});
	},

	/**
	 * This method is called after user has logged in successfully. It will call the previously attepmed 
	 * URL (if any) other wise I will route to index.
	 * 
	 */
	onSuccess: function(){
		console.log('LoginController.onSuccess');
		var self = this;
		var attemptedTransition = this.get('attemptedTransition');
		//console.log(attemptedTransition);
        if (attemptedTransition) {
        	console.log('Retrying attemptedTransition');
        	attemptedTransition.retry();
          	self.set('attemptedTransition', null);
        } else {
			// Redirect to 'index' by default.
			self.transitionToRoute('index');
        }
	}
});

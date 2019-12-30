
function EmailController($scope) {
    $scope.isPopupVisible = false;
    $scope.isComposeVisible = false;
    $scope.composeEmail = {};
    $scope.activeTab = "Inbox";
    $scope.sentEmails = [];
    $scope.deletedEmails = [];
    $scope.labels = ["Inbox", "Sent", "Trash", "Spam"]
    

    /*forward email */
    
     $scope.forwardEmail = function () {
        $scope.isPopupVisible = false;
        $scope.composeEmail = {};
        angular.copy($scope.selectedEmail, $scope.composeEmail);
        $scope.composeEmail.to = $scope.composeEmail.from;
        $scope.composeEmail.from = "me";
        
        $scope.composeEmail.body = "\n ___________________ \n" +
            "From: " + $scope.composeEmail.from + "\n" + 
            "To: " + $scope.composeEmail.to + "\n" +
            "FW: " + $scope.composeEmail.subject + "\n" +            "Sent:  " + "\n" + $scope.composeEmail.date + $scope.composeEmail.body;
             
       $scope.isComposeVisible = true;
     
     
     };
    
    /*reply to email */
    
    $scope.replyEmail = function() {
        $scope.isPopupVisible = false;
        $scope.composeEmail = {};
        angular.copy($scope.selectedEmail, $scope.composeEmail);
        $scope.composeEmail.to = $scope.composeEmail.from;
        $scope.composeEmail.from = "me";
        
        $scope.composeEmail.body = "\n ___________________ \n" +
            "From: " + $scope.composeEmail.from + "\n" + 
            "To: " + $scope.composeEmail.to + "\n" +
            "Re: " + $scope.composeEmail.subject + "\n" +            "Sent:  " + "\n" + $scope.composeEmail.date + $scope.composeEmail.body;
             
       $scope.isComposeVisible = true;

    
    };
    /* send an email */
    
    
    
    $scope.sendEmail = function() {
        // $scope.sentEmails.splice($scope.composeEmail); // we want a stack rather than a FIFO queue 
        $scope.composeEmail.date = new Date();
        $scope.composeEmail.from = "me";
        if ($scope.composeEmail.to == undefined) {
            alert('Please enter a recipient.');
        }
        
        else if ($scope.composeEmail.from =="" ) {
            alert('This email has no subject.  Send anyway?');
        }
        
        else if ($scope.composeEmail.body == undefined) {
            alert('This email is empty.  Send anyway?');
            
        }
        
        else {
            alert("Sucess! You sent an email to " + $scope.composeEmail.to + " about " + $scope.composeEmail.subject + " !");
            
            $scope.isComposeVisible = false;
            $scope.sentEmails.unshift($scope.composeEmail);
            $scope.composeEmail = {};
          
        }
    };


    
    /* delete email */
    
    
    $scope.deleteEmail = function(email) {


        if ($scope.activeTab == "Inbox") {
            $scope.deletedEmails.unshift(email);
            $scope.emails.shift(email);
        }

        if ($scope.activeTab == "Sent") {
            $scope.deletedEmails.unshift(email);
            $scope.sentEmails.shift(email);
        }

        
        if ($scope.activeTab == "Inbox" && $scope.emails.length === 0) {
            $scope.notification = {subject: "You have no new emails!"};
            $scope.emails.push($scope.notification);
        }
    
    };

    /** Mark email as new

    $scope.markAsNew = function(email)
    {
        $scope.deletedEmails.pop(email);
        $scope.emails.unshift(email);
    }; **/

    $scope.deleteForever = function(email) {
        $scope.deletedEmails.shift(email);

        if (deletedEmails.length === 0) {
            $scope.deletedEmails.push($scope.notification);
        }
    }

    //Need to generalize this to get rid of repeated code - so label making is possible
    $scope.moveDeletedToInbox = function(email) {

        $scope.deletedEmails.shift(email);
        $scope.emails.push($scope.notification);

    };



    /* show email */
    $scope.showPopup = function(email) {
        $scope.isPopupVisible = true;
        $scope.selectedEmail = email;
    };
    
    $scope.closePopup = function() {
        $scope.isPopupVisible = false;
    };
    
    /* Compose an email */
    
    $scope.showCompose = function() {
        
        $scope.isComposeVisible = true;
      
    };
    
    $scope.closeCompose = function() {
        $scope.isComposeVisible = false;
    };
    
    $scope.emails = [
        { to: 'Roommate 1', from: 'me', subject: 'Dont bother : Have interview today', date: 'Jan 1', body: 'Can you please please please not mashup my written code interview by bothering me early in the morning.' },
        { to: 'Roommate 2', from: 'me', subject: 'I am okey with node', date: 'Feb 15', body: 'just kidding. implementing mongoose module didnt seem to work this time around' },
        { to: 'Roommate 3', from: 'me', subject: 'I hate you Angular!', date: 'Dec 8', body:'wassup dude' }
    ];

    $scope.sentEmails = [

        { to: 'Roommate 1', from: 'me', subject: 'Dont bother : Have interview today', date: 'Jan 1', body: 'Can you please please please not mashup my written code interview by bothering me early in the morning.' },
        { to: 'Roommate 2', from: 'me', subject: 'I am okey with node', date: 'Feb 15', body: 'just kidding. implementing mongoose module didnt seem to work this time around' },
        { to: 'Roommate 3', from: 'me', subject: 'I hate you Angular!', date: 'Dec 8', body:'wassup dude' }
    


    ];
    

    $scope.deletedEmails = [
        { from: 'Oracle', subject: 'What is up with that?', date: 'June 17th', body: 'We are not really sure why our software does not work'},
        { from: 'Oracle', subject: 'What is up with that?', date: 'June 17th', body: 'We are not really sure why our software does not work'},
        { from: 'Oracle', subject: 'What is up with that?', date: 'June 17th', body: 'We are not really sure why our software does not work'}

    ];
}
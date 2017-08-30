Template.gifmaker.events({
    'change input': function(ev) {
        _.each(ev.target.files, function(file) {
            if(file!=null && file['type']!=null && file['type'].split('/')[0]=='image'){
                Meteor.saveFile(file, file.name,ev.originalEvent.currentTarget.id);  
                
            }
            else{
                ev.currentTarget.value="";
                alert("Invalid file type, only image files allowed");
                console.log("Invalid file type, only image files allowed");
            }
        });
    }
});

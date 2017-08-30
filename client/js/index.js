$( document ).ready(function() {
    //Drag and Drop methods
    $( "#dropDiv" ).bind( "dragover dragenter", function(e) {
        e.preventDefault();
        e.stopPropagation();
    });
    
    $( "#dropDiv" ).bind("drop", function(e) {
        var dataTransfer =  e.originalEvent.dataTransfer;
        if( dataTransfer && dataTransfer.files.length) {
            e.preventDefault();
            e.stopPropagation();
            var filetypecheck_allok = true;
            $.each( dataTransfer.files, function(i, file) {
                if(file.type.match('image.*')){
                    var val = false;
                    for(let key in images){
                        if(images[key]==""){
                            images[key]=file;
                            $("#"+key).hide()
                            val=true;
                            Meteor.saveFile(file, file.name,key);  
                            var reader = new FileReader();
                            reader.onload = $.proxy(
                                function(file, $imgList, event) {
                                    var img = file.type.match('image.*') ? "<img src='" + event.target.result + "' /> " : "";
                                    $imgList.prepend( $("<li>").append( img + file.name ) );
                                }, this, file, $("#imgList"));
                            reader.readAsDataURL(file);
                            break;
                        }
                    }
                    if(!val){
                        alert("Only 5 files can be uploaded at a time");
                    }
                }
                else{
                    filetypecheck_allok=false;
                }
            });
            
            if(!filetypecheck_allok){
                alert("Some of the dragged files are not supported, only image files are accepted");
            }
        }
    });
    
    $("#resetButton").bind("click",function(e){
        //empty the image list
        $("#imgList").html("");
        
        //reset milliSeconds Value
        $("#milliSeconds").val("");
        
        //clear the image list variable
        for(let key in images){
            images[key]="";
            //show input divs
            $("#"+key).show();
            //clear all input fields
            document.getElementById(key).getElementsByTagName("input")[0].value="";
        }
    });
    
    $("#submitButton").bind("click",function(e){
        //get the milliseconds value 
        var milliSeconds = $("#milliSeconds").val();
        
        if(milliSeconds!=null && milliSeconds!=undefined && milliSeconds!="" && !isNaN(milliSeconds) && milliSeconds>0){
            //create an empty array, to store the base64 image strings
            var imgArr =  [];
            for(let key in images){
                if(images[key]!=""){
                    imgArr.push(images[key]);
                }
            }
        
            //create gif using base64 image array 
            gifshot.createGIF({'images': imgArr,'interval': 0.001 * milliSeconds}, function(obj) {
                if(!obj.error) {
                    var image = obj.image,
                    animatedImage = document.createElement('img'),
                    downloadLink = document.createElement('a')
                    breakpoint = document.createElement('br');
                    animatedImage.src = image;
                    downloadLink.href= image;
                    downloadLink.download="file.gif";
                    downloadLink.innerHTML="download";
                    document.body.appendChild(breakpoint);
                    document.body.appendChild(breakpoint);
                    document.body.appendChild(animatedImage);
                    document.body.appendChild(breakpoint);
                    document.body.appendChild(downloadLink);
                    
                    $("#resetButton").click();
                    
                }
            });
        }
        else{
            alert("Input a valid milliSeconds value");  
        }
    });
});

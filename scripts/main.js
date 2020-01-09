$(document).ready(function() {
    var route = window.location.pathname;
    if(route == '/') {
        $('.professional').on("change", function() {
            var value = $(this).val();

            if(value == "Student") {
                $('#teacherform').hide();
                $('#studentform').show();
            }
            else if(value == "Teacher") {
                $('#teacherform').show();
                $('#studentform').hide();
            }
        });

        $('#product').on("change", function() {
            var value = $(this).val();

            if(value == "select") {
                $('#questions').hide();
            }
            else {
                switch(value) {
                    case "LetzConnect" :
                        $('#bucket').val("Placement Support");
                        break; 
                    case "Glabs" :
                        $('#bucket').val("Certification Course");
                        break;
                    case "ONE.class" :
                        $('#bucket').val("Class Management");
                        break;
                    case "PupilFirst" :
                        $('#bucket').val("Digital learning");
                        break;
                    case "Aspiration.ai" :
                        $('#bucket').val("Certification Course");
                        break;
                    case "upGrad for College" :
                        $('#bucket').val("Digital Learning");
                        break;
                    case "Visual Learning" :
                        $('#bucket').val("Digital Learning");
                        break;
                    case "FACE ProGrad" :
                        $('#bucket').val("Digital Learning");
                        break;
                    case "STEP TRAIN" :
                        $('#bucket').val("Certification Course");
                        break;
                    case "Interactive Teaching and Learning Platform" :
                        $('#bucket').val("Coding Course");
                        break;
                    case "E-Box" :
                        $('#bucket').val("Coding Course");
                        break;
                    case "Talent Rank" :
                        $('#bucket').val("Assessment Tests");
                        break;
                    case "Accelerator Program" :
                        $('#bucket').val("Certification Course");
                        break;
                    case "EnglishBolo" :
                        $('#bucket').val("Digital Learning");
                        break;
                    case "Career Path Navigator" :
                        $('#bucket').val("Assessment Tests");
                        break;
                    case "Job Readiness" :
                        $('#bucket').val("Assessment Tests");
                        break;
                    case "Embibe for Learners & Educators" :
                        $('#bucket').val("Assessment Tests");
                        break;
                }
                $('#questions').show();
            }
        });

        $('#teacherproduct').on("change", function() {
            var value = $(this).val();

            if(value == "select") {
                $('#teacherquestions').hide();
            }
            else {
                $('#teacherquestions').show();
            }
        });

    }
    else if(route == '/stats') {
        $('#products').change(function() {
            var product = $(this).val();
            console.log(product);
            //Get Student Responses from the database
            $.ajax({
                url: '/getstudentstats',
                method: "post",
                data: {product: product},
                success: function(data) {
                    var responses = Object.values(data);
                    //Sorting the responses based on average
                    responses.sort((a, b) => {
                        console.log(a.average);
                        return(parseInt(a.average)-parseInt(b.average));
                    });

                    //Calcaulate average of all responses for every product
                    var average = 0;
                    for(i=0;i<responses.length; i++) {
                        average = average + parseFloat(responses[i]["average"]);
                    }
                    average = parseFloat(average / responses.length).toFixed(2);
                    console.log(average);   
                    
                    $('#studentresponses tr').remove();
                    var code = '';
                    if(responses.length == 0) {
                        $('#studentresponses h5').remove();
                        $('#studenttable thead').remove();
                        code = code + '<h5>No responses found</h5>';
                    }
                    else {
                        $('#studentresponses h5').remove();
                        for(i=0;i<responses.length; i++) {
                            $('#studenttable thead').remove();
                            $('#studenttable').append('<thead><tr><th>Name</th><th>Average is '+average+'</th></tr></thead>');
                            code = code + '<tr><td>'+responses[i]["name"]+'</td><td>'+responses[i]["average"]+'</td></tr>';
                        }
                    }
                    $('#studentresponses').append(code); 
                }
            });

            $.ajax({
                url: '/getteacherstats',
                method: "post",
                data: {product: product},
                success: function(data) {
                    var responses = Object.values(data);
                    //Sorting the responses based on average
                    responses.sort((a, b) => {
                        console.log(a.average);
                        return(parseInt(a.average)-parseInt(b.average));
                    });
                    console.log(responses);

                    //Calcaulate average of all responses for every product
                    var average = 0;
                    for(i=0;i<responses.length; i++) {
                        average = average + parseFloat(responses[i]["average"]);
                    }
                    average = parseFloat(average / responses.length).toFixed(2);
                    console.log(average);
                
                    $('#teacherresponses tr').remove();
                    var code = '';
                    if(responses.length == 0) {
                        $('#teacherresponses h5').remove();
                        $('#teachertable thead').remove();
                        code = code + '<h5>No responses found</h5>';
                    }
                    else {
                        $('#teacherresponses h5').remove();
                        for(i=0;i<responses.length; i++) {
                            $('#teachertable thead').remove();
                            $('#teachertable').append('<thead><tr><th>Name</th><th>Average is '+average+'</th></tr></thead>');
                            code = code + '<tr><td>'+responses[i]["name"]+'</td><td>'+responses[i]["average"]+'</td></tr>';
                        }
                    } 
                    $('#teacherresponses').append(code);
                }
            });
        });

        
    }
    
    
});
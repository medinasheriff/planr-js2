
// jquery for location and strategy alternate display

$(document).ready(function(){
	$("#show").click(function(){
	  $("div #showstrategy").show();
	  $("div #location").hide();

	  $("#hide").click(function(){
		$("div #location").show();
		$("div #showstrategy").hide();
	  })

	});
	
  });

 


//   javascript for table data

 const overlay = document.querySelector(".modal");
 const addCampaign = document.querySelector(".addCampaign");
 const save = document.querySelector(".save");
 const emptyCampaign = document.querySelector(".content");
// const cancel = document.querySelector(".cancel");

//  addCampaign.addEventListener("click", () => {
    //  overlay.style.display = "flex"
//    })
// cancel.addEventListener("click", () => {
//     overlay.style.display = "none"
// })
save.addEventListener("click", () => {
    // overlay.style.display = "none"
	addData();
	emptyCampaign.style.display = "none"
})
//to replace the empty campaign record page with the entered values





// addCampaign.addEventListener("click", () => {
//     console.log(addCampaign)
// })
const monthArray = ['apple','Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

function addData(){
    let table = document.querySelector(".tablePage");
	let campaignName=document.querySelector('.campaign_name').value;
	let campaignType=document.querySelector('.campaign_type').value;
	let startDuration=document.querySelector('.duration_start_date').value;
	let endDuration=document.querySelector('.duration_end_date').value;

    let state=document.querySelector('#state').value;

	let startDateFormat=startDuration.split("-");
	let endDateFormat=endDuration.split("-");
	let [startYear,startMonth,startDay] = startDateFormat;
	let [endYear,endMonth,endDay] = endDateFormat;
	let status
	let statusColor

	startMonth=monthArray[startMonth.slice(1)];
	endMonth=monthArray[endMonth.slice(1)];

	let startDate = new Date(`${startYear} ${startMonth},${startDay}`).getTime();
	let endDate = new Date(`${endYear} ${endMonth},${endDay}`).getTime();
	let currentDate=new Date().getTime();

	// if(startDate>currentDate && startDate>endDate){
	// 	status="Failed"
	// 	statusColor="status-failed"
	// 	console.log("failed");
	//  }
     
	if(startDate<currentDate && endDate<=currentDate){
		status="completed";
		statusColor="status-complete"
	} else if(startDate<=currentDate && endDate>currentDate){
		status="Ongoing";
		statusColor="status-ongoing"

	}else if (startDate >currentDate && endDate>currentDate){
		status="Pending";
		statusColor="status-pending"
	}

	else {
		status="Failed";
		statusColor="status-failed"
	};
	console.log({startDate,endDate,currentDate});

	
	
	 

    table.style.display = "table"
   
 
	if(campaignName =="" || campaignType =="" || startDuration==""){
		alert("Please fill all fields first!");
	}else{
		let html="";
 
		//  html="<tr><td><input type='radio'><a href='#'>"+campaignName+ ' Campaign '+ ' - '+startDuration+"</a></td><td>"+campaignType+"</td><td class=status-complete>"+status+"</td></tr>";
         html=`<tr><td><input type='radio'><a href='#'data-bs-toggle="modal" data-bs-target="#myModal"> ${state} ${campaignName}  Campaign - ${startDuration}</a></td><td>${campaignType}</td><td class=${statusColor}>${status}</td></tr>`;
        console.log(html)
 
		console.log(document.getElementById('result').innerHTML+=html);
 
		document.querySelector('.campaign_name').value="";
		document.querySelector('.campaign_type').value="";
		document.querySelector('.duration_start_date').value="";
	}
}





// jquery for location and strategy alternate display

$(document).ready(function () {
	$("#show").click(function () {
	  $("div #showstrategy").show();
	  $("div #location").hide();
  
	  $("#hide").click(function () {
		$("div #location").show();
		$("div #showstrategy").hide();
	  });
	});
  });
  
  //   javascript for table data
  const overlay = document.querySelector(".modal");
  const addCampaign = document.querySelector(".addCampaign");
  const save = document.querySelector(".save");
  const cancel = document.querySelector(".cancel");
  const close = document.querySelector(".btn-close");
  const emptyCampaign = document.querySelector(".content");
  
  let cacheArr = [];
  let edit = false;
  let editIndex;
  
  save.addEventListener("click", () => {
	addData();
  });
  
  // ensure edit is false
  close.addEventListener("click", () => (edit = false));
  cancel.addEventListener("click", () => (edit = false));
  
  const monthArray = [
	"apple",
	"Jan",
	"Feb",
	"Mar",
	"Apr",
	"May",
	"June",
	"July",
	"Aug",
	"Sept",
	"Oct",
	"Nov",
	"Dec",
  ];
  
  function addData() {
	let tableContainer = document.querySelector(".tablePage");
	let campaignName = document.querySelector(".campaign_name").value;
	let campaignType = document.querySelector(".campaign_type").value;
  
	// returns a date string e.g "2022-09-28"
	let startDuration = document.querySelector(".duration_start_date").value;
	let endDuration = document.querySelector(".duration_end_date").value;
  
	let state = document.querySelector("#state").value;
  
	// validation
	if (campaignName == "" || campaignType == "" || startDuration == "") {
	  alert("Please fill all fields first!");
	  // move out of the function
	  return;
	}
  
	// split duration into arr e.g ["2022","09","28"]
	let startDateFormat = startDuration.split("-");
	let endDateFormat = endDuration.split("-");
  
	// Destructure the above array.
	let [startYear, startMonth, startDay] = startDateFormat;
	let [endYear, endMonth, endDay] = endDateFormat;
  
	// initialize status and statusColor
	let status;
	let statusColor;
  
	// return month from month array
	startMonth =
	  monthArray[Number(startMonth) < 10 ? startMonth.slice(1) : startMonth];
	endMonth = monthArray[Number(endMonth) < 10 ? endMonth.slice(1) : endMonth];
  
	// convert date into milliseconds for math; new Date("year month, day")
	let startDate = new Date(`${startYear} ${startMonth},${startDay}`).getTime();
	let endDate = new Date(`${endYear} ${endMonth},${endDay}`).getTime();
  
	// new Date() returns present date
	let currentDate = new Date().getTime();
  
	// status logic
	if (startDate <= currentDate && endDate <= currentDate) {
	  status = "completed";
	  statusColor = "status-complete";
	} else if (startDate < currentDate && endDate > currentDate) {
	  status = "Ongoing";
	  statusColor = "status-ongoing";
	} else if (startDate > currentDate && endDate > currentDate) {
	  status = "Pending";
	  statusColor = "status-pending";
	} else {
	  status = "Failed";
	  statusColor = "status-failed";
	}
  
	// table
	tableContainer.style.display = "block";
  
	// extract form data into an object
	let obj = {
	  id: new Date().getTime(),
	  campaign: campaignName,
	  start: startDuration,
	  end: endDuration,
	  type: campaignType,
	  state,
	  status,
	  color: statusColor,
	};
  
	// tablebody
	let result = document.getElementById("result");
  
	// ensures table body is empty for evry function run since everything is being rendered from an array;
	result.innerHTML = "";
  
	// if edit is false add to the cacheArray that is being rendered;
	if (!edit) {
	  cacheArr.push(obj);
	} // change the obj of that editIndex to new obj being entered in the form
	else {
	  cacheArr[editIndex] = obj;
	}
  
	// render table rows according to the no of objects in the cacheArray
	cacheArr.forEach((cache, idx) => {
	  // store objects data in the html datasets for easy retrieval
	  result.innerHTML += `
	  <tr data-status=${cache.status}>
				<td>
  
				<input type='radio'>
				<a href='#'data-bs-toggle="modal" data-bs-target="#myModal" data-index=${idx} data-id=${cache.id}> ${cache.state} ${cache.campaign} - ${cache.start}
			  </a>
  
				</td>
				<td>${cache.type}</td>
				<td class=${cache.color}>${cache.status}</td>
			</tr>`;
	});
  
	// select all anchor tags to link to the edit
	let editBtns = document.querySelectorAll("#result a");
	editBtns.forEach((editBtn) => {
	  editBtn.addEventListener("click", (e) => {
		editTable(e);
	  });
	});
  
	document.querySelector(".campaign_name").value = "";
	document.querySelector(".campaign_type").value = "";
	document.querySelector(".duration_start_date").value = "";
  
	edit = false;
  
	// replace empty campaign with table container
	emptyCampaign.style.display = "none";
  }
  
  function editTable(e) {
	edit = true;
  
	// initialize form inputs
	let campaignName = document.querySelector(".campaign_name");
	let campaignType = document.querySelector(".campaign_type");
	let startDuration = document.querySelector(".duration_start_date");
	let endDuration = document.querySelector(".duration_end_date");
	let state = document.querySelector("#state");
  
	// dataId is present date in milliseconds
	let dataId = e.target.dataset.id;
  
	// index from the cacheArray
	let dataIndex = e.target.dataset.index;
  
	// find obj with dataId it returns the object found
	let foundId = cacheArr.find((cache) => cache.id == dataId);
  
	if (foundId) {
	  // ensure every form input is automatically filled with values in the object found;
	  campaignName.value = foundId.campaign;
	  campaignType.value = foundId.type;
	  startDuration.value = foundId.start;
	  endDuration.value = foundId.end;
	  state.value = foundId.state;
	  editIndex = dataIndex;
	}
  }
  
  // initialize search input
  const search = document.querySelector(".search");
  function searchTable() {
	// convert value from search input to lowercase
	let searchValue = search.value.toLowerCase();
  
	// select all table rows; <tr>
	let tableRows = document.querySelectorAll("tbody tr");
  
	//loop through the table rows
	for (let i = 0; i < tableRows.length; i++) {
	  // initialize each table row
	  let tr = tableRows[i];
  
	  // if tr exists
	  if (tr) {
		// convert data-status from tr tag into lowercase
		let statusValue = tr.dataset.status.toLowerCase();
  
		// if searchvalue from search input is not present in status value leave table row <tr> as it is
		if (statusValue.indexOf(searchValue) > -1) {
		  tr.style.display = "";
		} // if it is present set <tr> display to none
		else {
		  tr.style.display = "none";
		}
	  }
	}
  }
  
  // run function immediately we stop typing
  search.addEventListener("keyup", searchTable);
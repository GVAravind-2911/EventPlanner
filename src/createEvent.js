import axios from "axios";
import React, { useState } from "react";
import ReactDOM from "react-dom/client";

function CreateEvent() {

    const [firstDropdownValue, setFirstDropdownValue] = useState('');
    const [secondDropdownOptions, setSecondDropdownOptions] = useState([]);
    const [secondDropdownValue, setSecondDropdownValue] = useState('');
    const [thirdDropdownValue, setThirdDropdownValue] = useState('');
    const [priceHandling, setPriceHandling] = useState('');


    function validateData(){
        var eventname = document.getElementById("eventnameinput").value;
        var eventdescription = document.getElementById("contents").value;
        var eventlogo = document.getElementById("eventlogoinput").value;
        var eventcategory = document.getElementById("eventcategoryinput").value;
        var eventtype = document.getElementById("eventtypeinput").value;
        var eventreach = document.getElementById("eventreachinput").value;
        var eventlocation = document.getElementById("eventlocationinput").value;
        var startDate = new Date(document.getElementById("eventstartinput").value);
        var endDate = new Date(document.getElementById("eventfinishinput").value);
        var eventlimit = document.getElementById("eventlimitinput").value;
        var eventlimitnumber = document.getElementById("eventlimitnumberinput").value;
        var eventprice = parseFloat(document.getElementById("eventpriceinput").value);
        var eventpaymentlink = document.getElementById("eventpaymentlinkinput").value;
        var closingDate = new Date(document.getElementById("eventenddateinput").value);
    
        if(eventname === "" || eventdescription === "" || eventlogo === "" || eventcategory === "" || eventtype === "" || eventreach === "" || eventlocation === "" || isNaN(startDate.getTime()) || isNaN(endDate.getTime()) || (eventlimit === "yes" && eventlimitnumber === "") || (eventprice === "yes" && ( isNaN(eventprice) || eventpaymentlink === "" )) || isNaN(closingDate.getTime())){
            alert("Please fill all the fields");
            return;
        }
        else{
            if(eventlimit === "yes"){
                if(eventlimitnumber < 0){
                    alert("Please enter a valid event limit");
                    return;
                }
            }
            if(eventprice < 0){
                alert("Please enter a valid event price");
                return;
            }
            if (startDate >= endDate) {
                alert("End date should be greater than start date");
                return;
            }
    
            var diffHours = Math.abs(endDate - startDate) / 36e5;
            if (diffHours < 1) {
                alert("Minimum event duration should be 1 hour");
                return;
            }
            if (closingDate <= new Date(Date.now() + 1 * 60 * 60 * 1000) || closingDate >= endDate) {
                alert("Registration close time should be at least 1 hour from now and before the end date");
                return;
            }

            else {
                var data = {
                    eventname: eventname,
                    eventdescription: eventdescription,
                    eventlogo: eventlogo,
                    eventcategory: eventcategory,
                    eventtype: eventtype,
                    eventreach: eventreach,
                    eventlocation: eventlocation,
                    eventlimit: eventlimit,
                    eventlimitnumber: eventlimitnumber,
                    eventprice: eventprice,
                    eventpaymentlink: eventpaymentlink,
                    eventstartdate: startDate.toISOString(),
                    eventenddate: endDate.toISOString(),
                    eventclosingdate: closingDate.toISOString()
                };
            
                axios.post('/createevent', data)
                    .then(response => {
                        console.log(response);
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }
    
            }
    }

    const handleFirstDropdownChange = (event) => {
        const selectedValue = event.target.value;
        setFirstDropdownValue(selectedValue);
        updateSecondDropdownOptions(selectedValue);
    };

    const updateSecondDropdownOptions = (selectedValue) => {
        const optionsForSelectedValue = getOptionsForSelectedValue(selectedValue);
        setSecondDropdownOptions(optionsForSelectedValue);
    };

    const getOptionsForSelectedValue = (selectedValue) => {
    if (selectedValue === 'technical') {
        return ['Hackathon', 'Workshop', 'Seminar', 'Conference', 'Guest Lecture', 'Tech Expo'];
    } 
    else if (selectedValue === 'non-technical') {
        return ['Concerts','Stand-Up Comedy','Sports Tournament','Fan Expo','Comic Con','Fests','Miscallaenous'];
    }
    }

    const handleThirdDropdownChange = (event) => {
        const selectedValue = event.target.value;
        setThirdDropdownValue(selectedValue);
        enableLimit(selectedValue);
    }

    const enableLimit = (value) => {
        if(value === "yes"){
            document.getElementById("eventlimitnumberinput").disabled = false;
            document.getElementById("eventlimitnumberinput").style.cursor = "default";
        }
        else{
            document.getElementById("eventlimitnumberinput").disabled = true;
            document.getElementById("eventlimitnumberinput").style.cursor = "not-allowed";
        }
    }

    const handlePriceDropdownChange = (event) => {
        const selectedValue = event.target.value;
        setPriceHandling(selectedValue);
        priceHandlingFunction(selectedValue);
    }

    const priceHandlingFunction = (value) => {
        if(value === "yes"){
            document.getElementById("eventpriceinput").disabled = false;
            document.getElementById("eventpriceinput").style.cursor = "default";
            document.getElementById("eventpaymentlinkinput").disabled = false;
            document.getElementById("eventpaymentlinkinput").style.cursor = "default";
        }
        else{
            document.getElementById("eventpriceinput").disabled = true;
            document.getElementById("eventpriceinput").style.cursor = "not-allowed";
            document.getElementById("eventpaymentlinkinput").disabled = true;
            document.getElementById("eventpaymentlinkinput").style.cursor = "not-allowed";
        }
    }

    return (
        <div className="mainContainer">
            <h1 className="mainHeader">Create Your Event</h1>
            <hr className="ruler"/>
            <div className="contents">
            <div className="column" style={{"gap":"0px"}}>
                <div style={{"width":"100%"}}>
                <h3>Enter Your Event Name:</h3>
                <input type="text" id="eventnameinput" className="textInput"/>
                </div>
                <div style={{"width":"100%"}}>
                <h3>Enter Your Event Description:</h3>
                <textarea id="contents" className="description"/>
                </div>
                <div className="logoUpload">
                    <h3>Enter Event Logo Link:</h3>
                    <input type="text" id="eventlogoinput" className="textInput" style={{"width":"100%"}}/>
                </div>
                <div className="price">
                    <div>
                        <h3>Paid Event?</h3>
                        <select id="eventprice" className="dropdownCat4" onChange={handlePriceDropdownChange}>
                            <option hidden defaultValue={''}></option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                    <div>
                        <h3>Enter Your Event Price:</h3>
                        <input type="text" id="eventpriceinput" className="textInput" />
                    </div>
                </div>
            </div>
            <div className="column">
                <div style={{"display":"flex","flexDirection":"row","gap":"20px"}}>
                <div>
                <h3>Choose Your Event Category:</h3>
                <select id="eventcategoryinput" onChange={handleFirstDropdownChange} className="dropdownCat">
                    <option hidden defaultValue={''}></option>
                    <option value="technical">Technical</option>
                    <option value="non-technical">Non-Technical</option>
                </select>
                </div>
                <div>
                <h3>Choose Your Event Type:</h3>
                <select id="eventtypeinput" className="dropdownCat1" value={secondDropdownValue} onChange={(e) => setSecondDropdownValue(e.target.value)}>
                    {secondDropdownOptions.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                </div>
                </div>
                <div style={{"display":"flex","flexDirection":"row","gap":"40px"}}>
                    <div style={{"width":"230px"}}>
                    <h3>Choose Your Event Reach:</h3>
                    <select id="eventreachinput" className="dropdownCat2">
                        <option hidden defaultValue={''}></option>
                        <option value="open">Open</option>
                        <option value="institutional">Institutional</option>
                    </select>
                    </div>
                    <div style={{"width":"250px","padding":"0px"}}>
                        <h3>Enter Your Event Location:</h3>
                        <input type="text" id="eventlocationinput" className="textInput" style={{"width":"75%"}}/>
                    </div>
                </div>
                <div style={{"display":"flex","gap":"0px","flexDirection":"column"}}>
                <h3 className="topborder">Choose Your Event Duration:</h3>
                <div style={{"display":"flex","flexDirection":"row","gap":"20px"}}>
                    <div>
                    <h4>From:</h4>
                    <input type="datetime-local" id="eventstartinput" className="dateInput"/>
                    </div>
                    <div>
                    <h4>To:</h4>
                    <input type="datetime-local" id="eventfinishinput" className="dateInput"/>
                    </div>
                </div>
                </div>
                <div style={{"display":"flex","flexDirection":"row","gap":"20px"}}>
                <div>
                <h3>Limit Registrations?:</h3>
                <select id="eventlimitinput" className="dropdownCat3" onChange={handleThirdDropdownChange}>
                    <option hidden defaultValue={''}></option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>
                </div>
                <div style={{"paddingLeft":"67px"}}>
                <h3>Set Your Event Limit:</h3>
                <input type="text" id="eventlimitnumberinput" className="textInput" />
                </div>
                </div>
                <div style={{"display":"flex","flexDirection":"row","gap":"40px"}}>
                <div className="paymentlink">
                    <h3>Payment Link:</h3>
                    <textarea id="eventpaymentlinkinput" className="paymentlinkarea"/>
                </div>
                <div className="registrationclose">
                    <h3>Registration Close Date:</h3>
                    <input type="datetime-local" id="eventenddateinput" className="dateInput"/>
                </div>
                </div>
            </div>
        </div>
        <hr className="ruler" style={{"marginTop":"30px"}}/>
        <div className="buttonContainer">
            <button className="CreateEventButton" onClick={validateData}>Create Event</button>
        </div>
        </div>
    );
}

const domContainer = document.querySelector('#ce');
const root = ReactDOM.createRoot(domContainer);
root.render(<CreateEvent />);
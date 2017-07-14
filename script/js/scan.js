function createMembership() {
  const formData = sessionStorage.getItem('form-data');
  const settings = {
    "async": true,
    "crossDomain": true,
    "url": "/create-membership",
    "method": "POST",
    "data": {"payload": formData}
  };

  $.ajax(settings).done(function (response) {
    const membershipID = sessionStorage.setItem('membershipID', response.payload.member['fullMembershipId']);
    window.location.href = "form-complete.html";
  });
}

function uploadImage() {
  const form = new FormData();
  form.append("metadata", "{\"type\":\"DRIVING_LICENSE\", \"country\":\"USA\"}");
  form.append("backsideImage", $('#upload_backsideImage')[0].files[0]);

  document.getElementById('spinner').style.display = 'block';

  const fastFillURl = "/fastfill_back";
  const settings = {
    "async": true,
    "crossDomain": true,
    "url": fastFillURl,
    "method": "POST",
    "processData": false,
    "contentType": false,
    "mimeType": "multipart/form-data",
    "data": form
  };

  $.ajax(settings).done(function (response) {
    document.getElementById('spinner').style.display = 'none';
    document.getElementById('index-banner').style.display = 'none';
    const parsedResponse = JSON.parse(response);

    document.getElementById('success_results').innerHTML =
       `<div class="center container">   
          <form id="memberData" class="col s12" onsubmit="createMembership(); return false;">
            <div class="center row">
              <div class="input-field col s12">
                <input type="text" class="validate" value=${parsedResponse.firstName}>
                <label class="active" class="active">First Name</label>
              </div>
              <div class="input-field col s12">
                <input type="text" class="validate" value=${parsedResponse.lastName}>
                <label class="active">Last Name</label>
              </div>
              <div class="input-field col s4">
                <input type="text" class="validate" value=${parsedResponse.dob}>
                <label class="active" for="dob">DOB</label>
              </div>
              <div class="input-field col s4">
                <input type="text" class="validate" value=${parsedResponse.gender}>
                <label class="active" for="gender">Gender</label>
              </div>
              <div class="input-field col s4">
                <input type="text" class="validate" value=${parsedResponse.expiry}>
                <label class="active" for="expiration_date">Expiration Date</label>
              </div>
              <div class="input-field col s12">
                <input type="text" id="street" class="validate" value="">
                <label class="active">Street</label>
              </div>
              <div class="input-field col s12">
                <input  type="text" class="validate" value=${parsedResponse.city}>
                <label class="active" for="city">City</label>
              </div>
              <div class="input-field col s6">
                <input id="state" type="text" class="validate" value=${parsedResponse.state}>
                <label class="active" for="state">State</label>
              </div>
              <div class="input-field col s6">
                <input id="postal_code" type="text" class="validate" value=${parsedResponse.postalCode}>
                <label class="active" for="postal_code">Postal Code</label>
              </div>
              <div class="input-field col s12">
                <input id="country" type="text" class="validate" value=${parsedResponse.issuingCountry}>
                <label class="active" for="country">Country</label>
              </div>      
              <div class="input-field col s12">
                <input id="icon_telephone" type="tel" class="validate">
                <label for="icon_telephone" data-error="wrong" data-success="right">Phone number</label>
              </div>
            </div> 
            <div class="center">
                <button class="btn-large waves-effect waves-light green center s12" type="submit">Click to Confirm</button>       
            </div>
          </form>
        </div>`;

      const streetNumber = document.querySelector('#street').value=parsedResponse.street;
      const country = document.querySelector('#country').value="US";
      // const areaCode = JSON.stringify(document.querySelector('#area_code').value);
      // const phoneNumber = JSON.stringify(document.querySelector('#icon_telephone').value);
      const formData = JSON.stringify({
        "payload": {
          "membership": JSON.parse(sessionStorage.getItem('membership-type')),
          "member": {
            "memberName": {
              "firstName": parsedResponse.firstName,
              "lastName": parsedResponse.lastName
            },
            "mobilePhone": {
              "completeNumber": "6263123942",
              "extension": "1",
              "areaCode": "1",
              "type": "MOBILE"
            },
            "dateOfBirth": parsedResponse.dob,
            "mailingAddress": {
              "addressLineOne": streetNumber,
              "city": parsedResponse.city,
              "stateOrProvinceCode": parsedResponse.state,
              "postalCode": parsedResponse.postalCode,
              "countryCode": country
            },
            "homeEmail": "one1@test.com",
            "paidStatus": "UNPAID"
          },
          "password":"member123"
        }
      });

      sessionStorage.setItem('form-data', formData);
  });
}

// function callNetVerify() {
//   const canvas = document.getElementById("my-canvas");
//   const ctx = canvas.getContext("2d");
//   ctx.canvas.width  = 320;
//   ctx.canvas.height = 240;
//
//   const img = document.getElementById("img-tag");
//   ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
//
//   const form = new FormData();
//   form.append("metadata", "{\"type\":\"DRIVING_LICENSE\", \"country\":\"USA\"}");
//
//   const base64Img = canvas.toDataURL("image/png");
//   const splitBase64 = base64Img.split("base64,");
//   const stringedBase64 = splitBase64[1];
//
//   const settings = {
//     "async": true,
//     "crossDomain": true,
//     "url": "http://localhost:3000/netverify",
//     "method": "POST",
//     "processData": false,
//     "data": {
//       "merchantIdScanReference": "TestScanReference",
//       "frontsideImage": stringedBase64,
//       "successUrl": "https://hookb.in/E7R0BeW8",
//       "errorUrl": "https://hookb.in/E7R0BeW8",
//       "callbackUrl": "https://requestb.in/wbvffiwb",
//       "idtype": "DRIVING_LICENSE",
//       "country": "USA"
//     }
//   };
//
//   $.ajax(settings).done(function (response) {
//     $("#success_results").append(response);
//     console.log(response);
//   });
// }

function updateStatus() {
  document.getElementById('file-uploaded').style.display = "none";
  document.getElementById('submitBtn').style.display = "unset";
}

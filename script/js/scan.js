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

    console.log(parsedResponse);

    document.getElementById('success_results').innerHTML =
       `<div class="center container">   
          <form class="col s12">
            <div class="center row">
              <div class="input-field col s12">
                <input type="text" class="validate" value=${parsedResponse.firstName}>
                <label class="active" class="active">First Name</label>
              </div>
              <div class="input-field col s12">
                <input type="text" class="validate" value=${parsedResponse.lastName}>
                <label class="active">Last Name</label>
              </div>
              <div class="input-field col s6">
                <input type="text" class="validate" value=${parsedResponse.dob}>
                <label class="active" for="dob">DOB</label>
              </div>
              <div class="input-field col s6">
                <input type="text" class="validate" value=${parsedResponse.gender}>
                <label class="active" for="gender">Gender</label>
              </div>
              <div class="input-field col s12">
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
                <input type="text" class="validate" value=${parsedResponse.state}>
                <label class="active" for="state">State</label>
              </div>
              <div class="input-field col s6">
                <input type="text" class="validate" value=${parsedResponse.postalCode}>
                <label class="active" for="postal_code">Postal Code</label>
              </div>
              <div class="input-field col s12">
                <input type="text" class="validate" value=${parsedResponse.issuingCountry}>
                <label class="active" for="country">Country</label>
              </div>
            </div>     
          </form>
        </div>
        <div class="center">
            <a href="/form-complete" class="btn-large waves-effect waves-light green form-header center s16">Click to confirm information</a>       
        </div>`;

      document.querySelector('#street').value=parsedResponse.street;
  });
}



function preview_snapshot() {
  // freeze camera so user can preview pic
  Webcam.freeze();

  // swap button sets
  document.getElementById('pre_take_buttons').style.display = 'none';
  document.getElementById('post_take_buttons').style.display = '';
}

function cancel_preview() {
  // cancel preview freeze and return to live camera feed
  Webcam.unfreeze();

  // swap buttons back
  document.getElementById('pre_take_buttons').style.display = '';
  document.getElementById('post_take_buttons').style.display = 'none';
}

function save_photo() {
  // actually snap photo (from preview freeze) and display it
  Webcam.snap( function(data_uri) {
    // display results in page
    document.getElementById('results').innerHTML =
      `<h2>Driver Licence:</h2>
        <img id="img-tag" src="${data_uri}"/>
        <form>
          <input type="button" value="Save photo in Desktop" onClick="saveImage()"/>
          <input type="button" id="netverify" value="Send to NetVerify" onClick="callNetVerify()"/>
        </form>`;
    document.getElementById('results').style.display = 'block';

    // swap buttons back
    document.getElementById('pre_take_buttons').style.display = '';
    document.getElementById('post_take_buttons').style.display = 'none';
  } );
}

function saveImage() {
  const canvas = document.getElementById("my-canvas");
  const ctx = canvas.getContext("2d");
  ctx.canvas.width  = 320;
  ctx.canvas.height = 240;

  const img = document.getElementById("img-tag");
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  const convertedImg = canvas.toDataURL("image/png", 1.0);
  const a  = document.createElement('a');

  a.href = convertedImg;
  a.download = 'image.png';
  a.click()
}

function callNetVerify() {
  const canvas = document.getElementById("my-canvas");
  const ctx = canvas.getContext("2d");
  ctx.canvas.width  = 320;
  ctx.canvas.height = 240;

  const img = document.getElementById("img-tag");
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

  const form = new FormData();
  form.append("metadata", "{\"type\":\"DRIVING_LICENSE\", \"country\":\"USA\"}");

  const base64Img = canvas.toDataURL("image/png");
  const splitBase64 = base64Img.split("base64,");
  const stringedBase64 = splitBase64[1];

  const settings = {
    "async": true,
    "crossDomain": true,
    "url": "http://localhost:3000/netverify",
    "method": "POST",
    "processData": false,
    "data": {
      "merchantIdScanReference": "TestScanReference",
      "frontsideImage": stringedBase64,
      "successUrl": "https://hookb.in/E7R0BeW8",
      "errorUrl": "https://hookb.in/E7R0BeW8",
      "callbackUrl": "https://requestb.in/wbvffiwb",
      "idtype": "DRIVING_LICENSE",
      "country": "USA"
    }
  };

  $.ajax(settings).done(function (response) {
    $("#success_results").append(response);
    console.log(response);
  });
}

function updateStatus() {
  document.getElementById('file-uploaded').style.display = "none";
  document.getElementById('submitBtn').style.visibility = "visible";
}

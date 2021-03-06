<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
  <meta name="description" content="" />
  <meta name="author" content="" />

  <title>OAuth Assignment SSD</title>

  <!-- Bootstrap Core CSS -->
  <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet" />

  <!-- Custom CSS -->
  <link href="css/stylish-portfolio.min.css" rel="stylesheet" />
  <link href="css/style.css" rel="stylesheet" />
</head>

<body id="page-top">
  <!-- Header -->
  <header>
    <h2 class="text-center">OAuth Application</h2>
    <div class="tabset">
      <input type="radio" name="tabset" id="tab1" aria-controls="marzen" checked>
      <label for="tab1">Google Drive</label>
      <input type="radio" name="tabset" id="tab2" aria-controls="rauchbier">
      <label for="tab2">LinkedIn</label>

      <div class="tab-panels">
        <section id="marzen" class="tab-panel">
          <!-- Google Drive Tabs Starts -->
          <div class="container">
            <div class="container--content">
              <div class="content content--active">
                <p class="mb-2">You can upload the images into your Google Drive, by simply login into your Google Drive</p>
                <i class="fab fa-google-drive"></i>
                <a class="btn btn-primary btn-md js-scroll-trigger center" id="login">Login to Google</a>
                <div class="overlay"></div>
              </div>

            </div>
          </div>
           <!-- Google Drive Tabs Ends -->
        </section>
         <!-- LinkedIn Login starts -->
        <section id="rauchbier" class="tab-panel">
          <div class="container">
            <br><br>
            <div class="row center">
              <div class="col s6 offset-s3">
                <div class="card">
                  <div class="card-content">
                    <span class="card-title">Linkedin Login using Node and passport</span>
                  </div>
                  <div class="card-action">
                    <!-- <a href="/auth" class="waves-effect waves-light btn social linkedin">
                      <i class="fa fa-linkedin"></i> Sign in with Linkedin
                    </a> -->
                    <a href="/auth" class="waves-effect waves-light btn social linkedin">
                      <i class="fa fa-linkedin"></i> Sign In to Linked In
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
       
        </section>
       <!-- LinkedIn Login Ends -->
      </div>
    </div>
  </header>

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="index.js"></script>
</body>

</html>

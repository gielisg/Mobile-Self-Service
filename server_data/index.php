<?php 
	ini_set("mbstring.internal_encoding","UTF-8");
	ini_set("mbstring.func_overload",7);

	ini_set('max_execution_time', 300);
	

	require_once __DIR__ . '/vendor/autoload.php';


	$con=mysqli_connect("localhost","root","",'self_service');      
	
	if ($con->connect_error) {
		die("Connection failed: " . $con->connect_error);
	}
	
	if (isset($_SERVER['HTTP_ORIGIN'])) {
		header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
		header('Access-Control-Allow-Credentials: true');
		header('Access-Control-Max-Age: 86400');    // cache for 1 day
	}
 
	// Access-Control headers are received during OPTIONS requests
	if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
 
		if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
			header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         
 
		if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
			header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
 
		exit(0);
	}
	$postdata = file_get_contents("php://input");
	// $postdata = $_POST;
	if (isset($postdata)) {
		$request = json_decode($postdata);
		$status = '';
		$status=$request->status;

		if ($status == "login") {
			$email=$request->email;
			$username = $request->username;
			$password=$request->password;
			$sel = "select * from user_db";
			
			$query=mysqli_query($con,$sel);
			if(!$query){
				echo json_encode(['status'=>'fail','detail'=>'empty email or usename or password']);
				exit;
			}
			else{
				while($row=mysqli_fetch_array($query,MYSQLI_ASSOC))
				{
				   
					if((($row['email'] == $email) || ($row['username'] == $username)) && ($row['password'] == $password))
					{   
						echo json_encode(['status'=>'success','userid'=>$row['email']]);
						exit;
					}
				} 
				echo json_encode(['status'=>'fail','detail'=>'Invaid username or password']);
			}
		}

		else if($status == "register")
		{
			$username = $request->username;
			$email = $request->email;
			$phone = $request->phone;
			$password = $request->password;
			$address = $request->address;

			$acount_number = create_accountNumber();

			$isstate = 2;
			
			$sel = "select * from user_db";
			$query=mysqli_query($con,$sel);
			while($row=mysqli_fetch_array($query))
			{
				if(($row['email'] == $email) || ($row['username'] == $username) )
				{
					$isstate = 1;
				}
			}
			if($isstate == 2)
			{
				$insert="INSERT INTO `user_db` (`username`, `email`, `phone`, `password`, `address`, `accountnum`) VALUES ('$username', '$email', '$phone', '$password', '$address', '$acount_number')";
				if(mysqli_query($con,$insert)){
					$sel_id = "select * from user_db where email='$email' or username='$username'";
					$query_id=mysqli_query($con, $sel_id); 
					$row=mysqli_fetch_array($query_id);
					// $userid = $row['reg_id'];
					// print_r($r   ow);
					echo json_encode(['status'=>'success', 'detail'=>$row]);
				} else{
					echo json_encode(['status'=>'fail', 'detail'=>'Signup is failed']);
				}
			}
			else{
				echo json_encode(['status'=>'fail', 'detail'=>'username or email is already taken']);
			}
			
		}

		else if($status == "get_detail")
		{
			$email = $request->email;

			$sel = "SELECT * FROM user_db WHERE email='$email'";		
			$query = mysqli_query($con,$sel);

			// echo $sel;
			if(!$query){
				echo json_encode(['status'=>'fail','detail'=>'empty email or password']);
				exit;
			}
			else{
				$row=mysqli_fetch_array($query,MYSQLI_ASSOC);

				echo json_encode(['status'=>'success','detail'=>$row]);
			}
			
		}

		else if($status == "get_bill_history")
		{
			$email = $request->email;

			$sel = "SELECT * FROM user_db WHERE email='$email'";		
			$query = mysqli_query($con, $sel);

			// echo $sel;
			if(!$query){
				echo json_encode(['status'=>'fail','detail'=>'empty email or password']);
				exit;
			}
			else{
				$row=mysqli_fetch_array($query,MYSQLI_ASSOC);

				$user_id = $row['ID'];

				$sel_bill = "SELECT * FROM bill_db WHERE user_id='$user_id'";		
				$query = mysqli_query($con, $sel_bill);

				$return_bill = [];

				while($row_bill=mysqli_fetch_array($query,MYSQLI_ASSOC)){
					array_push($return_bill, $row_bill);
				}

				echo json_encode(['status'=>'success','detail'=>$return_bill]);
			}
			
		}

		else if($status == "download_bill")
		{
			$bill_num = $request->bill_num;
			$due_date = $request->due_date;
			$amount_owin = $request->amount_owin;
			$index = $request->index;

			$mpdf = new \Mpdf\Mpdf();
			$bill_part = '<p style='.'"'.'font-size:31px; color: black;'.'"'.'>'.'Bill Number => '.'<span style='.'"'.'color:blue; font-size:35px;'.'"'.'>'.$bill_num.'</span></p>';
			$mpdf->WriteHTML($bill_part);
			$bill_part = '<p style='.'"'.'font-size:31px; color: black;'.'"'.'>'.'Due Date => '.'<span style='.'"'.'color:blue; font-size:35px;'.'"'.'>'.$due_date.'</span></p>';
			$mpdf->WriteHTML($bill_part);
			$bill_part = '<p style='.'"'.'font-size:31px; color: black;'.'"'.'>'.'Amount Owin => '.'<span style='.'"'.'color:blue; font-size:35px;'.'"'.'>'.$amount_owin.'</span></p>';
			$mpdf->WriteHTML($bill_part);
			$mpdf->Output('MyPDF.pdf', 'F');

			echo json_encode(['status'=>'success','detail'=>'Download success']);
			
		}

		else if($status == "download_bill_total")
		{
			$email = $request->email;

			$sel = "SELECT * FROM user_db WHERE email='$email'";		
			$query = mysqli_query($con, $sel);

			$mpdf = new \Mpdf\Mpdf();

			$style_1 = 'font-size: 40px; color: #3982a3; width: 100%; text-align: center; font-weight: bold;';

			// echo $sel;
			if(!$query){
				echo json_encode(['status'=>'fail','detail'=>'empty email or password']);
				exit;
			}
			else{
				$row=mysqli_fetch_array($query,MYSQLI_ASSOC);

				$user_id = $row['ID'];

				$html_data = '				
					<style>
					.main_row {
						font-size:25px; width:100%;
						font-weight: bold; 
						padding: 20px; 
						border-radius: 10px; 
						color: black; 
						margin-top: 30px; 
						margin-bottom: 10px; 
						border: 1px solid #ddd;
						background-color: white;
					}
					.main_title{
						font-size: 40px; 
						color: #3982a3; 
						width: 100%; 
						text-align: center; 
						font-weight: bold;
					}
					.first_span {
						color: black; 
						width: 100%;
					}
					.second_span {
						color: #3982a3;
					}
					</style>
					<body style="background-color: #fafafa;">
						<p class="main_title">Bill Data of '.$row['username'].'</p>
				';

				$sel_bill = "SELECT * FROM bill_db WHERE user_id='$user_id'";		
				$query = mysqli_query($con, $sel_bill);

				while($row_bill=mysqli_fetch_array($query,MYSQLI_ASSOC)){
					$bill_num = '<div class="main_row">
									<span class="first_span">
										Bill Number => 
										<span class="second_span">'.$row_bill['bill_num'].'
										</span>
									</span><br>';

					$bill_date = '<span class="first_span">
									Due Date => 
									<span class="second_span">'.$row_bill['due_date'].'
									</span>
								</span><br>';

					$bill_amount = '<span class="first_span">
										Amount Owin => 
										<span class="second_span">'.$row_bill['bill_amount'].'
										</span>
									</span></div>';
										
					$html_data = $html_data.$bill_num.$bill_date.$bill_amount;
				}

				$html_data = $html_data.'</body>';

				$mpdf->WriteHTML($html_data);

				$mpdf->Output('MyPDF.pdf', 'F');

				echo json_encode(['status'=>'success','detail'=>'Download success']);
			}
			
		}

		else if($status == "change_password")
		{
			$old_pass = $request->old_pass;
			$new_pass = $request->new_pass;
			$email = $request->email;

			$sel = "SELECT * FROM user_db WHERE email='$email'";
		
			$query = mysqli_query($con,$sel);
			if(!$query){
				echo json_encode(['status'=>'fail','detail'=>'empty user data']);
				exit;
			}
			else{
				$row=mysqli_fetch_array($query,MYSQLI_ASSOC);

				if($old_pass == $row['password']){
					$update="UPDATE user_db SET `password` = '$new_pass' WHERE email = '$email'";
					if(mysqli_query($con,$update)){
						echo json_encode(['status'=>'success','detail'=>'password changed']);
					} else{
						echo json_encode(['status'=>'success','detail'=>'password change fail']);
					}
				} else {
					echo json_encode(['status'=>'fail','detail'=>'Old password is not correct. Please try again']);
				}
			}
			
		}

		else if($status == "change_userinfo")
		{
			$old_userData = $request->old_userData;
			$new_userData = $request->new_userData;
			$email = $request->email;			

			$sel = "SELECT * FROM user_db WHERE email='$email'";
		
			$query = mysqli_query($con,$sel);
			if(!$query){
				echo json_encode(['status'=>'fail','detail'=>'empty user data']);
				exit;
			}
			else{

				$row=mysqli_fetch_array($query,MYSQLI_ASSOC);

				$update;

				switch( $request->detail ){
					case "username":
						$update = "UPDATE user_db SET `username` = '$new_userData' WHERE email = '$email'";
					break;
					case "address":
						$update = "UPDATE user_db SET `address` = '$new_userData' WHERE email = '$email'";
					break;
					case "email":
						$update = "UPDATE user_db SET `email` = '$new_userData' WHERE email = '$email'";
					break;
					case "phone":
						$update = "UPDATE user_db SET `phone` = '$new_userData' WHERE email = '$email'";
					break;
				}
				if(mysqli_query($con,$update)){
					$return_quary = $request->detail." changed";
					echo json_encode(['status'=>'success', 'detail'=>$return_quary]);
				} else{
					$return_quary = $request->detail." change fail";
					echo json_encode(['status'=>'success','detail'=>'password change fail']);
				}
			}
			
		}
		
		else if($status == "save_book")
		{
			$book_date = $request->book_date;
			$book_hour = $request->book_hour;
			$book_street = $request->book_street;
			$worker_email = $request->worker_email;
			$book_price = $request->book_price;
			$buyer_email = $request->buyer_email;
			$book_comment = $request->book_comment;

			$sel = "select * from buyer where email='$buyer_email'";			
			$query = mysqli_query($con,$sel);
			if(!$query){
				echo json_encode(['status'=>'fail','detail'=>'empty email or username']);
				exit;
			}
			else{
				$row=mysqli_fetch_array($query,MYSQLI_ASSOC);


				$sel_worker = "select * from worker where email='$worker_email'";			
				$query_worker = mysqli_query($con,$sel_worker);
				$row_worker=mysqli_fetch_array($query_worker,MYSQLI_ASSOC);

				$buyer_id = $row['user_id'];
				$worker_id = $row_worker['user_id'];

				$insert="INSERT INTO `booklist` (`buyer_id`, `worker_id`, `book_date`, `book_hour`, `book_street`, `book_comment`, `book_price`) VALUES ('$buyer_id', '$worker_id', '$book_date', '$book_hour', '$book_street', '$book_comment', '$book_price')";
				$query_book = mysqli_query($con,$insert);
				echo json_encode(['status'=>'success','detail'=>$buyer_id]);
			}
			
		}
		else{
			echo json_encode(['status'=>'fail','detail'=>'Invaid server error']);
		}
	}
	else {
		echo "Not called properly with username parameter!";
	}


	function create_accountNumber() {

		$con=mysqli_connect("localhost","root","",'self_service');    
		
		$account_num = "";
		for($i = 0; $i < 8; $i++){
			$rand_num = rand(0, 9);
			$account_num = $account_num.$rand_num;
		}


		$sel = "select * from user_db";
		$query=mysqli_query($con,$sel);
		while($row=mysqli_fetch_array($query))
		{
			if(($row['accountnum'] == $account_num))
			{
				create_accountNumber();
			}
		}

		return $account_num;

	}























?>

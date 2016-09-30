$(function () {

	// Balance screens
	var buy_credit_screen = "<div id=\"buyCredits\"><span class=\"button-small\" data-money=\"200\">200</span>$0.99<span class=\"button-small\" data-money=\"400\">500</span>$0.99<span class=\"button-small\" data-money=\"1000\">1000</span>$0.99</div></div>";
	var balance_screen = "<h1>BALANCE <span id=\"addFunds\">+</span></h1><h2>$<span id=\"balance_value\">100</span></h2><h1>WAGER</h1><h2>$<span contenteditable=\"true\" id=\"wager_value\">25</span></h2>";

	// Game variables
	var name,
		pass,
		balance = 100,
		wager = 25,
		heads = true,
		flipping = false;

	// Functions
	function login() {
		name = $("#username").val();
		pass = $("#password").val();
	}

	function getSideChoice() {
		if ($("#heads").hasClass("active_side_choice")) {
			heads = true;
		} else {
			heads = false;
		}
	}

	function updateBalance() {
		$("#balance_value").text(balance);
	}

	function getWager() {
		wager = parseInt($("#wager_value").html());
		if (wager >= balance && wager > 0) {
			wager = balance;
			$("#wager_value").text(balance);
		}
	}

	// Balance or add_credits
	$("#addFunds").on('click', function () {
		$("#balance").html(buy_credit_screen);
	});

	$(".button-small").on('click', function () {

		$("#balance").html(balance_screen);
	});

	// Validate wager
	$("#wager_value").on('blur', function () {
		getWager();
	});

	// Respond to click
	$(".button").on('click', function () {
		login();
		// Restructure the log in box
		$("#login_title").html("Welcome back,");
		$("#login_form").html("<h2>" + name + "</h2><input type=\"submit\" value=\"Settings\" class=\"button\"><input type=\"submit\" value=\"Sign out\" class=\"button\">");
		if (name == "admin" && pass == "admin") {
			balance = 1000000;
			updateBalance();
		}
	});

	$(".side_choice").on('click', function () {
		$(".side_choice").removeClass("active_side_choice");
		$(this).addClass("active_side_choice");
		getSideChoice();
	});


	$(".circle").on('click', function () {

		if (balance > 0) {
			var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
			$(this).addClass('animated flip').one(animationEnd, function () {
				$(this).removeClass('animated flip');
			});

			var win = Math.random() > 0.5;

			if (win) {
				balance += wager;
				$("#result").html("YOU WON!");
				if (heads) {
					$(this).addClass("heads");
				} else {
					$(this).removeClass("heads");
				}
			} else {
				balance -= wager;
				$("#result").html("YOU LOST!");
				if (heads) {
					$(this).removeClass("heads");
				} else {
					$(this).addClass("heads");
				}
			}

			updateBalance();
			getWager();

		} else {
			$("#result").html("Insufficient funds! Please refill balance.")
		}
	});
});
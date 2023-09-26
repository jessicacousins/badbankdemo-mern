function Withdraw() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");

  return (
    <Card
      bgcolor="success"
      header="Withdraw"
      status={status}
      body={
        show ? (
          <WithdrawForm setShow={setShow} setStatus={setStatus} />
        ) : (
          <WithdrawMsg setShow={setShow} />
        )
      }
    />
  );
}

function WithdrawMsg(props) {
  return (
    <>
      <h5>Success</h5>
      <button
        type="submit"
        className="btn btn-light"
        onClick={() => props.setShow(true)}
      >
        Withdraw again
      </button>
    </>
  );
}

function WithdrawForm(props) {
  const [email, setEmail] = React.useState("");
  const [amount, setAmount] = React.useState("");

  async function handle() {
    console.log(email, amount);

    if (!email || isNaN(amount) || parseFloat(amount) <= 0) {
      props.setStatus("Invalid input!");
      return;
    }

    // Create a withdrawal object
    const withdrawal = { email, amount };

    // Make a POST request to withdraw from the user's account
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(withdrawal),
    };

    try {
      const response = await fetch("/account/withdraw", requestOptions);
      const data = await response.json();

      if (response.status === 200) {
        props.setStatus("Withdrawal successful!");
      } else {
        props.setStatus("Withdrawal failed: " + data.error);
      }
    } catch (error) {
      console.error("Error withdrawing:", error);
      props.setStatus("Error withdrawing.");
    }

    props.setShow(false);
  }

  return (
    <>
      Email
      <br />
      <input
        type="input"
        className="form-control"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
      />
      <br />
      Amount
      <br />
      <input
        type="number"
        className="form-control"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.currentTarget.value)}
      />
      <br />
      <button type="submit" className="btn btn-light" onClick={handle}>
        Withdraw
      </button>
    </>
  );
}

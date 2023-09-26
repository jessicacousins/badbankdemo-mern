function Deposit() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");

  return (
    <Card
      bgcolor="warning"
      header="Deposit"
      status={status}
      body={
        show ? (
          <DepositForm setShow={setShow} setStatus={setStatus} />
        ) : (
          <DepositMsg setShow={setShow} />
        )
      }
    />
  );
}

function DepositMsg(props) {
  return (
    <>
      <h5>Success</h5>
      <button
        type="submit"
        className="btn btn-light"
        onClick={() => props.setShow(true)}
      >
        Deposit again
      </button>
    </>
  );
}

function DepositForm(props) {
  const [email, setEmail] = React.useState("");
  const [amount, setAmount] = React.useState("");

  async function handle() {
    console.log(email, amount);

    if (!email || isNaN(amount) || parseFloat(amount) <= 0) {
      props.setStatus("Invalid input!");
      return;
    }

    // Create a deposit object
    const deposit = { email, amount };

    // Make a POST request to deposit to the user's account
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(deposit),
    };

    try {
      const response = await fetch("/account/deposit", requestOptions);
      const data = await response.json();

      if (response.status === 200) {
        props.setStatus("Deposit successful!");
      } else {
        props.setStatus("Deposit failed: " + data.error);
      }
    } catch (error) {
      console.error("Error depositing:", error);
      props.setStatus("Error depositing.");
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
        Deposit
      </button>
    </>
  );
}

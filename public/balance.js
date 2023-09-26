function Balance() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");

  return (
    <Card
      bgcolor="info"
      header="Balance"
      status={status}
      body={
        show ? (
          <BalanceForm setShow={setShow} setStatus={setStatus} />
        ) : (
          <BalanceMsg setShow={setShow} />
        )
      }
    />
  );
}

function BalanceMsg(props) {
  return (
    <>
      <h5>Success</h5>
      <button
        type="submit"
        className="btn btn-light"
        onClick={() => props.setShow(true)}
      >
        Check balance again
      </button>
    </>
  );
}
function BalanceForm(props) {
  const [email, setEmail] = React.useState("");
  const [balance, setBalance] = React.useState("");
  const [status, setStatus] = React.useState("");

  // Function to fetch balance from the server
  async function fetchBalance() {
    if (!email) {
      setStatus("Please enter an email address.");
      setBalance(0); // Set balance to 0 or handle it in your UI
      return;
    }

    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(`/account/balance/${email}`, requestOptions);
      const data = await response.json();

      if (response.status === 200) {
        setBalance(data.balance);
        setStatus("Your balance is: " + data.balance);
      } else {
        setStatus("User not found or balance unavailable.");
        setBalance(0); // Set balance to 0 or handle it in your UI
      }
    } catch (error) {
      console.error("Error fetching balance:", error);
      setStatus("Error fetching balance.");
      setBalance(0); // Set balance to 0 or handle it in your UI
    }
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
      <button type="submit" className="btn btn-light" onClick={fetchBalance}>
        Check Balance
      </button>
      <br />
      {status && <p>{status}</p>}
      <p>Your balance is: {balance}</p>
    </>
  );
}

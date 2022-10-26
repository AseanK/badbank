function Withdraw(){
  const [show, setShow]         = React.useState(true);
  const [status, setStatus]     = React.useState('');
  const [deposit, setDeposit]   = React.useState('');
  const [balance, setBalance]   = React.useState('0');
  const [enable, setEnable] = React.useState('');
  
  const ctx = React.useContext(UserContext);  
  
  React.useEffect(() => {for (let i = 0; i < ctx.users.length; i++) {
    if (ctx.users[i].email == ctx.main) {
      setBalance(ctx.users[i].balance)
      break;
    }
  }}, []);

  function validate(field, label){
    if (!field) {
      setStatus('Error: ' + label);
      setTimeout(() => setStatus(''),5000);
      return false;
    }
  
    if (isNaN(field)) {
      alert("Please enter positive numbers \n" + field + " is not a number!")
      return false;
    }
  
    if (parseInt(field) <= 0) {
      alert("Please enter a number greater than 0 \n" + field + " is not greater than 0")
      return false;
    }
    
    if (parseInt(balance) - parseInt(field) < 0) {
      alert("Withdrawing this amount would cause an overdraft")
      return false;
    }
  return true;
  }
  
  function validateInput() {
  var depositAmount = document.getElementById("deposit");
  var enabled = true;
  
    if (depositAmount.value == "") {
      enabled = false;
    }
    if (enabled) {
      setEnable("enable");
    } else {
      setEnable("");
    }
  }
  
    function handleCreate(){
      //console.log(deposit, balance);
      if (!validate(deposit, 'deposit'))  return;
      var newBalance = parseInt(balance) - parseInt(deposit);
      
      setBalance(newBalance.toString());
  
      for (let i = 0; i < ctx.users.length; i++) {
        if (ctx.users[i].email == ctx.main) {
          ctx.users[i].balance = newBalance.toString();
          break;
        }
      }
    // ctx.users.push({name,email,password,balance:100});
      setShow(false);
    }    
  
  function clearForm(){
    setDeposit('');
    setEnable('');
    setShow(true);
  }
  
  if (ctx.main == "") {
    return (
      <>
      <Card
      bgcolor="secondary"
      header="Withdraw From Account"
      status={status}
      body={
      <div id="inval" style={{textAlign:"center"}}>You must be logged in to withdraw</div>
      }
      />
      </>
    )
  }
  else{
    return (
      <div>
        <div className="card-footer text-muted" style={{textAlign:'center'}}>
         logged in as <br/> {ctx.main}
        </div>
      <Card
        bgcolor="secondary"
        header="Withdraw From Account"
        status={status}
        body={show ? (  
                <>
                <div id = "balanceLabel" style={{textAlign:"center"}}>Availiable balance <br/> {balance}</div><br/>
  
                Withdraw Amount <br/>
                <input type="number" className="form-control" id="deposit" placeholder="Enter Withdraw Amount" value={deposit} onChange={e => {setDeposit(e.currentTarget.value); validateInput();}}/><br/>
                <button type="submit" disabled = {enable === ""} id = "createaccountsubmit" className="btn btn-light" onClick={handleCreate}  >Withdraw Amount</button>
                </>
              ):(
                <>
                <h5>Success</h5>
                <button type="submit"  className="btn btn-light" onClick={clearForm}>Add Another Withdraw</button>
                </>
              )}
      />
      </div>
    )
  }
}
function AllData(){
  const [data, setData] = React.useState('');
  
  React.useEffect(() => {
    // fetch all account from API
    fetch('/account/all')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setData(JSON.stringify(data));
      })
  
  //for (let i = 0; i < ctx.users.length; i++) {
  //  data = data.concat("<label><pre>" + "Email:"+ ctx.users[i].email + "   Password:" + ctx.users[i].password + "   Balance:" + ctx.users[i].balance + "</label></pre><br/>");
  //  
  //}

  }, []);
  
    return (
      <>
      <Card
        bgcolor="secondary"
        header="All Users' Data"
        status={status}
        body={ 
                <>
                {data}
                </>
              }
      />
      </>
    );
  }
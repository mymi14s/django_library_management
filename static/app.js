let app = Vue.createApp({
    provide:{
        numberWithCommas:function(x){
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    },
    delimiters: ['[%', '%]'],
    data() {
        window.appdata = {};
        return {
            bookDetail: {
                title: 'hello'
            },
            accounts: {

            },
            account: {

            },
            greeting: 1
        }
    },
    methods: {
        async getUser(){

          const res = await $.ajax({
                url: "/home/get_user/",
                type: "GET"
            });
            this.user = res.user;
            this.accounts = res.accounts;
            window.appdata.user = res.user;
            return;
      },
      async getAccount(){
          try {
              // console.log(window.location.href.split('/management/account/')[1])
            let aNumber = Number(
                window.location.href.split('/management/account/')[1].substring(0, 10));
            // console.log(aNumber, 'ANUMBER')
            if(typeof(aNumber)=="number"){
                // retry every 15 sec
                const res = await $.ajax({
                    url: "/management/api/sync_account/",
                    type: "POST",
                    data: {number:aNumber}
                });
                // console.log(res);
                if(res.number){
                    this.account = res;
                    window.appdata.account = res;
                    return res;
                }
                return {}

                // retry every 15 sec
            }
        }
        catch(err) {
            // console.log('not found', err)
        }
    },
    periodicGetAccount(){
        window.setTimeout(()=>{
            this.getAccount()
            this.periodicGetAccount();
        }, 100000)
    },
    welcomeGreeting(){
        if (window.sessionStorage.greetings!='1'){
            window.sessionStorage.setItem('greetings', '1');
            console.log(localStorage.greetings, 'LOCALSTORAGE')
            const time = new Date().getHours();
            let greeting;
            if (time < 12) {
              greeting = "Good morning";
            } else if (time < 18) {
              greeting = "Good Afternoon";
            } else {
              greeting = "Good evening";
            }

            Swal.fire({
              title: `<img src="https://w7.pngwing.com/pngs/315/623/png-transparent-smiley-icon-smiley-miscellaneous-face-emoticon.png" height="50" ><br>${greeting}`,
              html:
                'Welcome back, we have missed you!',
              showCloseButton: true,
              showCancelButton: true,
              focusConfirm: false,
              confirmButtonText:
                '<i class="fa fa-thumbs-up"></i> Continue!',
              confirmButtonAriaLabel: 'Thumbs up, great!',
            cancelButtonText:
                '<i class="fa fa-thumbs-up"></i>',
            cancelButtonAriaLabel: 'Thumbs up'
            })
            // end greeting

            // alert(this.greeting);
        }

    },
    // logout
    logout(){
        Swal.fire({
          title: 'Are you sure?',
          text: "You will be signed out!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, sign me out!'
        }).then((result) => {
          if (result.isConfirmed) {
              $.ajax({
                  url: "/accounts/logout/",
                  type: "GET"
              })
            Swal.fire(
              'Done!',
              'You have been signed out.',
              'success'
            )
            // clear session
            window.sessionStorage.setItem('greetings', 0);
            // redirect
            setTimeout(()=>{
              window.location.href = '/accounts/login/'
            }, 3000);
          }
        })
    }

      // end getUser
  },
  mounted(){
    // localStorage.greetings = '1'
    // this.welcomeGreeting();
    // this.getUser();
    // this.getAccount();
    // this.periodicGetAccount();
  },
  computed: {

  }
})

let fns = {
    numberWithCommas: (x)=>{
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    getImage: (user)=>{
        return user.photo ? '/media/'+user.photo : '/static/images/user/11.png';
    },
    showSpinner: ()=>{
        $("#spinner").modal({
          backdrop: "static", //remove ability to close modal with click
          keyboard: false, //remove option to close with keyboard
          show: true //Display loader!
        })
    },
    hideSpinner:(count)=>{
        setTimeout(()=>{
          $("#spinner").modal("hide");
        },count);
    },
    $confirm: async ()=>{
        let result = await Swal.fire({
              title: 'Are you sure?',
              text: "Your data will be processed",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes'
            })
        if(result.isConfirmed){
            Swal.fire(
              'Started!',
              'Processing',
              'success'
            )
            return true;
        }else{
            return false;
        }

    },
    $getCookie:(name)=>{
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    },
    $notify: (type, msg)=>{
        if(type=="success"){
            Swal.fire(
              'Success',
              msg,
              'success'
            )
        } else {
            Swal.fire(
              'Error',
              msg,
              'warning'
            )
        }

        setTimeout(()=>{
            $("#modal-lg").modal('hide');
        }, 2000)
    },
    $setDatatable: (id, order)=>{
        setTimeout(()=>{
            var printCounter = 0;
            $(id).DataTable( {
                dom: 'Bfrtip',
                order: [order],
                "columnDefs": [
                    { "width": "35%", "targets": 0 }
                ],
                buttons: [
                    'copy',
                    {
                        extend: 'excel',
                        messageTop: ''
                    },
                    {
                        extend: 'pdf',
                        messageTop: '',
                        messageBottom: ''
                    },
                    {
                        extend: 'print',
                        messageTop: function () {
                            printCounter++;

                            if ( printCounter === 1 ) {
                                return 'This is the first time you have printed this document.';
                            }
                            else {
                                return 'You have printed this document '+printCounter+' times';
                            }
                        },
                        messageBottom: null
                    }
                ]
            } );
        }, 2000);
    }
}
app.config.globalProperties = fns;
// app.config.compilerOptions.isCustomElement = tag => tag.includes('-')
// app.use(options => {
//         options.compilerOptions = {
//           ...(options.compilerOptions || {}),
//           isCustomElement: tag => /^x-/.test(tag)
//         };
//         return options;
//       });

app.component('issue-detail', {
    delimiters: ['[%', '%]'],
    template:
    /*html*/
    `
    <div class="card card-default">
      <div class="card-header">
        <h3 class="card-title text-primary"> </h3>

        <div class="card-tools">
          <button type="button" class="btn btn-tool" data-card-widget="collapse">
            <i class="fas fa-minus"></i>
          </button>
          <button type="button" class="btn btn-tool" data-card-widget="remove">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>
      <!-- /.card-header -->
      <div class="card-body">

        <div class="row gap-3">
         <div class="col-md-11">
         <span class="float-left">
             <button class="mr-4">Issue No: <span class="text-danger">[% issue.id %]</span></button>
             <button :class="issue.paid ? 'btn btn-primary mr-4' : 'mr-4'">Paid <input type="checkbox" :checked="issue.paid" disabled ></button>
         </span>
          <span class="float-right">
                <button v-show="issue.docstatus!='Submitted'" :class="'btn btn-'+statusClass+' mr-4'">[% issue.docstatus %]</button>
                <button :class="'btn btn-'+statusClass+' mr-4'"
                    v-show="issue.docstatus!='Draft'">[% issue.type %]
                </button>
                <div class="btn-group" role="group" aria-label="Button group with nested dropdown">
                  <div class="btn-group" role="group">
                    <button id="btnGroupDrop1" type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Action
                    </button>
                    <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                      <a @click.prevent="UpdateIssue('submit')" class="dropdown-item" href="#" v-show="issue.docstatus=='Draft'">Submit</a>
                      <a @click.prevent="UpdateIssue('delete')" class="dropdown-item" href="#" v-show="issue.docstatus=='Draft'">Delete</a>
                      <a @click.prevent="UpdateIssue('return')" class="dropdown-item" href="#" v-show="issue.docstatus=='Submitted' && issue.type=='Issued'">Return</a>
                      <a @click.prevent="UpdateIssue('pay')" class="dropdown-item" href="#" v-show="issue.docstatus=='Submitted' && !issue.paid && issue.type=='Return'">Make Payment</a>
                    </div>
                  </div>
                </div>

          </span>
          <br><br><hr>
          </div>

        </div>

        <div class="row">
          <div class="col-12 col-sm-6">
            <!-- <h3 class="d-inline-block d-sm-none">LOWA Men’s Renegade GTX Mid Hiking Boots Review</h3> -->
            <div class="col-12">
              <img :src="member.image ? '/media/'+member.image : '/static/dist/img/avatar5.png'"
              alt="Photo"
              style="display: block;
                margin-left: auto;
                margin-right: auto;
                width: 60%;
                height: 250px;" class="product-image" alt="Product Image">
            </div>
                <p class="text-center">
                  <a :href="'/library/members/'+member.id+'/'"><h3 class="my-3 text-primary">[% member.name %]</h3></a>
                </p>
              <p>
                  <table class="table">
                      <thead>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">Balance</th>
                          <td>Rs. <span class="text-red">[% member.account_balance %]</span></td>
                        </tr>
                      </tbody>
                    </table>
              </p>

              <hr>
          </div>
          <div class="col-12 col-sm-6">
          <div class="col-12">
            <img :src="book.image ? '/media/'+book.image : '/static/img/book.jpeg'"
            alt="Photo"
            style="display: block;
              margin-left: auto;
              margin-right: auto;
              width: 60%;
              height: 250px;" class="product-image" alt="Product Image">
          </div>
          <p class="text-center">
              <a :href="'/library/books/'+book.book_no+'/'"><h3 class="my-3 text-primary">[% book.title %]</h3></a>
          </p>
            <p>
                <table class="table">
                    <thead>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">ISBN</th>
                        <td>[% book.isbn %]</td>
                      </tr>
                      <tr>
                        <th scope="row">Publisher</th>
                        <td>[% book.publisher %]</td>
                      </tr>
                      <tr>
                        <th scope="row">Page</th>
                        <td>[% book.page %]</td>
                      </tr>
                      <tr>
                        <th scope="row">Status</th>
                        <td>[% book.status %]</td>
                      </tr>
                      <tr>
                        <th scope="row">Balance</th>
                        <td>[% book.balance %]</td>
                      </tr>
                      <tr>
                        <th scope="row">Author(s)</th>
                        <td>[% book.authors %]</td>
                      </tr>
                    </tbody>
                  </table>
            </p>

            <hr>
            <div class="bg-gray py-2 px-3 mt-4">
              <h4 class="mb-0">
                Rental fee: Rs. <span class="">[% book.rental_fee %]</span>
              </h4>
              <h4 class="mt-0">
                <small> </small>
              </h4>
            </div>



          </div>
        </div>

        <!-- <div class="row">
          <div class="col-md-12"><br>
              <button class="btn btn-primary float-right" type="submit">Submit</button>
          </div>
        </div> -->
        <!-- /.row -->

      </div>
      <!-- /.card-body -->
      <div class="card-footer">
        <!-- Visit <a href="https://select2.github.io/">Select2 documentation</a> for more examples and information about
        the plugin. -->
      </div>
    </div>
    `,
    props:{
        _book: {
            type: Object
        },
        _member:{
            type:Object
        },
        _issue:{
            type:Object
        }
    },
    data(){
        return {
            book: {
                // authors: "", balance: null,book_no: "",
                // created_at: "2", description: "", id: null, image: "",
                // isbn: "", page: null, publisher: "", qty: null,
                // rental_fee: "", status: "", title: ""
            },
            issue: {
                // book: null, book_no: "", created_at: "", docstatus: "",
                // id: null, member: null, paid: 0, posting_date: "",
                // qty: 1, rental_fee: "", title: "", type: "Issued"
                },
            member: {
                // account_balance: "0.00", id: null, image: "", name: ""
            }
        }
    },
    computed: {
        statusClass(){
            let colors = {
                'Draft':'warning', 'Submitted':'primary', 'Cancelled':'secondary'
            }
            return colors[this.issue.docstatus]
        }
    },
    methods: {
        async issueBook(){
            let proceed = await this.$confirm();

        },
        async UpdateIssue(action){
            let proceed = await this.$confirm();
            if(proceed){
                const res = await $.ajax({
                    url: `/library/books/issue/${this.issue.id}/`,
                    headers: {
                        "X-CSRFToken": this.$getCookie("csrftoken"),
                    },
                    cache: false,
                    type: "POST",
                    data: {
                        action:action
                    }
                })
                console.log(res)
                if(res.status==301){
                    this.$notify('Success', 'Document has been deleted')
                    setTimeout(function () {
                        window.location.href = res.link;
                    }, 2500);
                } else if(res.status==200){
                    this.book = res.book;
                    this.member = res.member;
                    this.issue = res.issue;
                    this.$notify('success', `Complete, please continue.`)
                } else {
                    this.$notify('Error', 'An error occured!')
                }
            }
        }
    },
    mounted(){
        this.book = this._book;
        this.member = this._member;
        this.issue = this._issue;

        // console.log(this.members)
        // this.hasURLParams();
        // watch select boxes
        // this.watchSelectFields();

    },
    watch:{
        // 'issue.book_id':{
        //     deep:true,
        //     handler(id){
        //
        //         console.log(book)
        //     }
        // }
    }
})

// [{id:1, name:'Hi'}, {id:2, name:'john'}]

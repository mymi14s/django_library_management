app.component('issue-book', {
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
        <form id="issuebookform" @submit.prevent="issueBook"
            method="POST" enctype="multipart/form-data">
        <div class="row">
        <div class="col-md-4">
          <div class="form-group">
            <label>Member</label>
            <select required data-placeholder="Select Member" id="member-select"
                class="form-control  select2" name="member" v-model="issue.member_id"
              style="width: 100%;" data-dropdown-css-class="select2-danger">
              <option v-for="member in members" :value="member.id"
                :selected="issue.member_id==member.id" >[% member.name %]</option>
            </select>
          </div>
        </div>

        <div class="col-md-6">
          <div class="form-group">
            <label>Book</label>
            <select id="book-select" required data-placeholder="Select Book" v-model="issue.book_id"
                class="form-control  select2" name="book"
              style="width: 100%;" data-dropdown-css-class="select2-danger"
              >
              <option v-for="book in books" :value="book.id"
              :selected="issue.book_id==book.id" >[% book.title %]</option>
            </select>
          </div>
        </div>

        <div class="col-md-2">
          <div class="form-group">
              <label>Rental Fee (Rs.)</label>
              <input type="number" class="form-control" id="fee" name="fee"
                placeholder="fee" :value="issue.rental_fee" disabled>
          </div>
        </div>
        </div>

        <div class="row">
          <div class="col-12 col-sm-6" v-show="issue.member_id">
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
          <div class="col-12 col-sm-6" v-show="issue.book_id">
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

        <div class="row">
          <div class="col-md-12"><br>
              <button v-show="showSubmit"
              class="btn btn-primary float-right" type="submit">Submit</button>
          </div>
        </div>
        <!-- /.row -->
        </form>
      </div>
      <!-- /.card-body -->
      <div class="card-footer">
        <!-- Visit <a href="https://select2.github.io/">Select2 documentation</a> for more examples and information about
        the plugin. -->
      </div>
    </div>
    `,
    props:{
        books: {
            type: Array,
            required: false
        },
        members:{
            type:Array
        }
    },
    data(){
        return {
            showSubmit: true,
            hasparams: null,
            issue:{
                member_id: null,
                member_name: '',
                book_title: '',
                book_id: null,
                book_no: '',
                rental_fee: null,
                type: 'Issue',
                qty: 1,
                paid: false,
                status: 'Draft'
            },
            book: {},
            member: {}
        }
    },
    computed: {

    },
    methods: {
        hasURLParams(){
            // alert(this.getParams('book_title'))
            if(window.location.search){
                if(this.getParams('book_id')){
                    this.getSelected(this.books, this.getParams('book_id'));
                } else {
                    this.getSelected(this.members, this.getParams('member_id'));
                }
                this.hasparams = true;
                return true;
            }
            return
        },
        getParams(name){
            return new URL(window.location.href).searchParams.get(name);
        },
        getSelected(obj, id){
            let selected = obj.filter(value=>{return value.id==id})[0];
            if(obj==this.books){
                this.issue.book_id=selected.id;
                this.issue.book_title=selected.title;
                this.issue.rental_fee=selected.rental_fee;
                this.book = selected
                if(this.book.balance<1){
                    this.$notify('error', `
                        ${this.book.title} is unavailale.
                    `)
                    this.showSubmit = false;
                } else {
                    this.showSubmit = true;
                }
            } else {
                this.issue.member_id = selected.id;
                this.issue.member_name = selected.name;
                this.member = selected;
                if(this.member.account_balance>=500){
                    this.$notify('error', `
                        ${this.member.name} owes more than rs. 500.00.\n
                        book cannot be issued.
                    `)
                    this.showSubmit = false;
                }else {
                    this.showSubmit = true;
                }

            }
        },
        async issueBook(){
            let proceed = await this.$confirm();
            if(proceed){
                const res = await $.ajax({
                    url: `/library/books/issue/`,
                    headers: {
                        "X-CSRFToken": this.$getCookie("csrftoken"),
                    },
                    cache: false,
                    type: "POST",
                    data: {
                        book:this.issue.book_id,
                        member:this.issue.member_id,
                        qty:this.issue.qty
                    }
                })
                if(res.status){
                    setTimeout(function () {
                        window.location.href = res.link;
                    }, 2500);
                }
            }


        },
        watchSelectFields(){
            $("#book-select").change(function(){
                this.getSelected(this.books, $("#book-select").val());
            }.bind(this));
            $("#member-select").change(function(){
                console.log($("#member-select").val())
                this.getSelected(this.members, $("#member-select").val());
            }.bind(this));
        }
    },
    mounted(){
        // console.log(this.members)
        this.hasURLParams();
        // watch select boxes
        this.watchSelectFields();

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

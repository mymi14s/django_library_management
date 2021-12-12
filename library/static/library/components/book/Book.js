app.component('book-detail', {
    delimiters: ['[%', '%]'],
    template:
    /*html*/
    `

      <!-- Default box -->
      <div class="card card-solid">
        <div class="card-body">
          <div class="row">
            <div class="col-12 col-sm-6">
              <!-- <h3 class="d-inline-block d-sm-none">LOWA Men’s Renegade GTX Mid Hiking Boots Review</h3> -->
              <div class="col-12">
                <img :src="book.image ? '/media/'+book.image : '/static/img/book.jpeg'"
                alt="Photo"
                style="display: block;
                  margin-left: auto;
                  margin-right: auto;
                  width: 60%;
                  height: auto" class="product-image" alt="Product Image">
              </div>
            </div>
            <div class="col-12 col-sm-6">
              <h3 class="my-3">[% book.title %]</h3>
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

              <div class="mt-4">
              <a :href="'/library/books/issue/?book_id='+book.id+'&book_title='+book.title" style="color:white">
                <div class="btn btn-primary btn-lg btn-flat">
                  <i class="fas fa-cart-plus fa-lg mr-2"></i>
                  Issue Book
                </div>
            </a>

                <div class="btn btn-default btn-lg btn-flat" data-toggle="modal"
                    data-target="#modal-lg">
                  <i class="fas fa-heart fa-lg mr-2"></i>
                    Edit Book
                </div>
              </div>


            </div>
          </div>
          <div class="row mt-4">
            <nav class="w-100">
              <div class="nav nav-tabs" id="product-tab" role="tablist">
                <a class="nav-item nav-link active" id="product-desc-tab" data-toggle="tab" href="#product-desc" role="tab" aria-controls="product-desc" aria-selected="true">Description</a>
                <!-- <a class="nav-item nav-link" id="product-comments-tab" data-toggle="tab" href="#product-comments" role="tab" aria-controls="product-comments" aria-selected="false">Comments</a>
                <a class="nav-item nav-link" id="product-rating-tab" data-toggle="tab" href="#product-rating" role="tab" aria-controls="product-rating" aria-selected="false">Rating</a> -->
              </div>
            </nav>
            <div class="tab-content p-3" id="nav-tabContent">
              <div class="tab-pane fade show active" id="product-desc" role="tabpanel" aria-labelledby="product-desc-tab">
                    [% book.description %]

              </div>
            </div>
          </div>
        </div>
        <!-- /.card-body -->
      </div>
      <!-- /.card -->

      <div class="modal fade" id="modal-lg">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Large Modal</h4>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p>
                <book-addedit
                    :book="book"
                    @process-form="processForm"
                    :btn_name="'Update Book'"
                ></book-addedit>
                <issue-book
                    :book="book"
                    @process-form="processForm"
                    :btn_name="'Update Book'"
                ></issue-book>
              </p>
            </div>
            <div class="modal-footer justify-content-between">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
              <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
            </div>
          </div>
          <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
      </div>

      <div class="modal fade" id="issue-book-modal">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Large Modal</h4>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p>
                <issue-book
                    :book="book"
                    @process-form="processForm"
                ></issue-book>
              </p>
            </div>
            <div class="modal-footer justify-content-between">
              <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
              <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
            </div>
          </div>
          <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
      </div>

    `,
    props:{
        book_no: {
            type: Number,
            reuired: false
        },
        showissuebook: false,
        showbookedit: false

    },
    data(){
        return {
            book: {}
        }
    },
    computed: {
        //
        // getImage(){
        //     return this.user.photo ? '/media/'+this.user.photo : '/static/images/user/11.png';
        // }
    },
    methods: {
        async getBookDetail(body=null){
            const res = await $.ajax({
                url: `/library/books/${this.book_no}/`,
                headers: {
                    "X-CSRFToken": this.$getCookie("csrftoken"),
                    // "Content-Type": "application/x-www-form-urlencoded"
                },
                // processData: false,
                cache: false,
                type: "POST",
                data: body
            })

            this.book = await res
            this.bookDetail = this.book
            return res
        },
        async processForm(e){
            let res = await this.getBookDetail(this.book);
            if(res){
                this.$notify('success', 'Book has been updated')
            } else {
                this.$notify('warning', 'An error occured')
            }
        }
    },
    mounted(){

        if(this.book_no){
            // alert()
            setTimeout(()=>{
                this.getBookDetail()
            }, 2000)
        }
    }
})

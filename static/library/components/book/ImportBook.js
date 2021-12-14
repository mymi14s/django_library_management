app.component('import-book', {
    delimiters: ['[%', '%]'],
    template:
    /*html*/
    `
    <div class="container-fluid">
      <!-- SELECT2 EXAMPLE -->
      <div class="card card-default">
        <div class="card-header">
          <h3 class="card-title">Import Books</h3>

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
        <form @submit.prevent="fetchBookAPI">
          <div class="row">
            <div class="col-md-3">
              <div class="form-group">
                <label>Number of Books *</label>
                <input required type="number" class="form-control"
                name="no_of_books" style="width: 100%;" v-model="filterParams.no_of_books">
              </div>
            </div>

            <div class="col-md-6">
              <div class="form-group">
                <label>Title (Optional)</label>
                <input type="text" class="form-control"
                name="title" style="width: 100%;" v-model="filterParams.title">
              </div>
            </div>

            <div class="col-md-3">
              <div class="form-group">
                <label>Author(s) (Optional)</label>
                <input type="text" class="form-control"
                name="authors" style="width: 100%;" v-model="filterParams.authors">
              </div>
            </div>


          </div>
              <div class="row">
              <div class="col-md-12">
              <!-- <label>.</label> -->
                  <span class="float-right">
                      <button class="btn btn-primary mr-4">Fetch</button>
                  </span>
              </div>
              </div>
          </form>
          <!-- /.row -->

          <h5>Fetch books will be listed below.</h5>
          <div class="row">
            <div class="col-12 col-sm-6">

            </div>
            <!-- /.col -->
            <div class="col-12 col-sm-6">

            </div>
            <!-- /.col -->
          </div>
          <!-- /.row -->
        </div>
        <!-- /.card-body -->
        <div class="card-footer">
          <!-- message here -->
          <span class="float-right">
              <button class="btn btn-warning mr-4" @click="saveBooks"
              v-show="results.length>1 ? true : false">Save Books</button>
          </span>
        </div>
      </div>
      <!-- /.card -->
      <div class="row">
         <div class="col-sm-12">
            <div class="iq-card">
               <div class="iq-card-header d-flex justify-content-between">
                  <div class="iq-header-title">
                     <h4 class="card-title"></h4>
                  </div>

               </div>
               <div class="iq-card-header d-flex justify-content-between">

               </div>
               <div class="iq-card-body">
                  <div class="table-responsive">
                     <table id="result-table" class="table table-striped table-bordered">
                        <thead>
                           <tr>
                              <th>Title</th>
                              <th>Page(s)</th>
                              <th>ISBN</th>
                              <th>Author(s)</th>
                              <th>Publisher</th>
                           </tr>
                        </thead>
                        <tbody>
                           <tr v-for="r in results">
                              <td>[% r.title %]</td>
                              <td>[% r['  num_pages'] %]</td>
                              <td>[% r.isbn %]</td>
                              <td>[% r.authors %]</td>
                              <td>[% r.publisher %]</td>
                           </tr>
                        </tbody>
                        <tfoot>
                           <tr>
                               <th>Title</th>
                               <th>Page(s)</th>
                               <th>ISBN</th>
                               <th>Author(s)</th>
                               <th>Publisher</th>

                           </tr>
                        </tfoot>
                     </table>
                  </div>
               </div>
            </div>
         </div>
      </div>

    </div>

`,
    props:{

    },
    data(){
        return {
            filterParams: {
                no_of_books: null,
                title: '',
                authors: ''
            },
            results: []
        }
    },
    computed: {
        //
        // getImage(){
        //     return this.user.photo ? '/media/'+this.user.photo : '/static/images/user/11.png';
        // }
    },
    methods: {
        async fetchBookAPI(){
            let proceed = await this.$confirm();
            if(proceed){
                $('#result-table').DataTable().destroy();
                this.results = []
                // process query
                let filters = '';
                if(this.title && this.filterParams.authors){
                    filters = `title=${this.filterParams.title}&authors={this..filterParamsauthors}`;
                } else if(this.filterParams.authors){
                    filters = `authors=${this.filterParams.authors}`;
                } else if(this.filterParams.title){
                    filters = `title=${this.filterParams.title}`;
                }
                const res = await $.ajax({
                    url: `/library/api/fetchbooks/`,
                    type: "POST",
                    headers: {
                        "X-CSRFToken": this.$getCookie("csrftoken"),
                    },
                    data: {
                        nos: this.filterParams.no_of_books,
                        filters: filters,
                        fetch: true
                    }
                })
                // console.log(res.res[0])
                this.processResponse(res);
            }
        },
        async saveBooks(){
            let proceed = await this.$confirm();
            if(proceed){
                const res = await $.ajax({
                    url: `/library/api/fetchbooks/`,
                    type: "POST",
                    headers: {
                        "X-CSRFToken": this.$getCookie("csrftoken"),
                    },
                    data: {
                        import_books: JSON.stringify(this.results)
                    }
                })
                // console.log(res.res[0])
                this.processResponse(res);
            }
        },
        prepareTable(res){

            this.results = res;
            this.$setDatatable('#result-table', [ 0, 'asc' ]);
    
        }, // end datatabse
        processResponse(res){
            if(res && res.type=='fetch'){
                console.log(res.res)
                this.prepareTable(res.res)
            } else if(res && res.type=='import' && res.status==200){
                this.$notify('success', 'Import Complete');
                setTimeout(()=>{
                    window.location.href='/library/books/list/';
                }, 2000)
            } else {
                this.$notify('Error', 'An error occured!.')
            }
        }
    },
    mounted(){

        if(this.book_no){
            // alert()
            setTimeout(()=>{
                // this.getBookDetail()
            }, 2000)
        }
    }
})

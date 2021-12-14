app.component('book-addedit', {
    delimiters: ['[%', '%]'],
    template:
    /*html*/
    `
    <div class="card card-default">
      <div class="card-header">
        <h3 class="card-title text-primary">[% book.title %]</h3>

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
        <form @submit.prevent="$emit('process-form')" id="addupdateform"
            method="POST" enctype="multipart/form-data">
        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label>Title</label>
              <input type="text" class="form-control" id="title"
                placeholder="Book Title" v-model="book.title"
                value="" name="title" required>
            </div>
          </div>
          <!-- /.col -->
          <div class="col-md-4">
            <div class="form-group">
                <label>ISBN</label>
                <input type="text" class="form-control" id="isbn" name="isbn"
                  placeholder="ISBN" v-model="book.isbn" value="" required>
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group">
                <label>Publisher</label>
                <input type="text" class="form-control" id="publisher" name="publisher"
                  placeholder="Publisher" v-model="book.publisher" :value="book.publisher" required>
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group">
                <label>Page(s)</label>
                <input type="number" class="form-control" id="page" name="page"
                  placeholder="Page" v-model="book.page" required>
            </div>
          </div>

          <div class="col-md-4">
            <div class="form-group">
                <label>Rental Fee</label>
                <input type="number" class="form-control" id="rental_fee" name="rental_fee"
                  placeholder="Rental Fee" v-model="book.rental_fee" required>
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group">
                <label>Quantity</label>
                <input type="number" class="form-control" id="qty" name="qty"
                  placeholder="Quantity" v-model="book.qty" required>
            </div>
          </div>
          <div class="col-md-4">
            <div class="form-group">
                <label>Instock</label>
                <input type="number" class="form-control" id="balance" name="balance"
                  placeholder="Balance" v-model="book.balance" required>
            </div>
          </div>

          <div class="col-md-6">
            <div class="form-group">
              <label>Status</label>
              <select required data-placeholder="Select status" class="form-control" name="status"
                style="width: 100%;" v-model="book.status" data-dropdown-css-class="select2-danger">
                <option selected="selected" :value="book.status">[% book.status %]</option>
                <option>Available</option>
                <option>Issued</option>
                <option>Out of Stock</option>
              </select>
            </div>

          </div>
          <div class="col-md-6">
            <div class="form-group">
                <label>Image</label>
                <input type="file" class="form-control" id="image"
                  placeholder="Image" v-model="book.image"  name="image">
            </div>
          </div>

          <div class="col-md-5">
            <div class="form-group">
                <label>Author(s)</label>
                <textarea type="text" class="form-control" id="authors"
                  placeholder="Author(s)" v-model="book.authors" name="authors"
                  rows="6" required></textarea>
            </div>
          </div>
          <div class="col-md-7">
            <div class="form-group">
                <label>Description</label>
                <textarea type="text" class="form-control" id="description"
                  placeholder="Desscription" v-model="book.description" name="description"
                  rows="6" required></textarea>
            </div>
          </div>
        </div>
        <!-- /.row -->

        <div class="row">
          <div class="col-md-12">
              <button class="btn btn-primary float-right" type="submit">[% btn_name %]</button>

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
        book: {
            type: Object,
            required: false
        },
        btn_name:{
            type:String
        }
    },
    data(){
        return {

        }
    },
    computed: {
        //
        // getImage(){
        //     return this.user.photo ? '/media/'+this.user.photo : '/static/images/user/11.png';
        // }
    },
    methods: {

    },
    mounted(){

    }
})

app.component('add-book', {
    delimiters: ['[%', '%]'],
    template:
    /*html*/
    `
    <div class="container-fluid">
        <h4 class="text-center display-4">Add Book</h4>
        <div class="row">
            <book-addedit
                :book="book"
                @process-form="processForm"
                :btn_name="'Add Book'"
            ></book-addedit>
        </div>
    </div>
`,
    props:{

    },
    data(){
        return {
            book: {
                title: '',
                authors: '',
                isbn: '',
                page: '',
                qty: null,
                balance: null,
                status: '',
                description: '',
                publisher: '',
                rental_fee: null
            }
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
                url: `/library/books/addbook/`,
                headers: {
                    "X-CSRFToken": this.$getCookie("csrftoken"),
                    // "Content-Type": "application/x-www-form-urlencoded"
                },
                cache: false,
                type: "POST",
                data: body
            })

            // this.book = await res
            // this.bookDetail = this.book
            return res
        },
        async processForm(e){
            let res = await this.getBookDetail(this.book);
            if(res){
                this.$notify('success', 'Book has been updated')
                window.location.href = `/library/books/${res.book.book_no}/`
            } else {
                this.$notify('warning', 'An error occured')
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

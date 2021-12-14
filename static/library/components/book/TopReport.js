app.component('top-reports', {
    delimiters: ['[%', '%]'],
    template:
    /*html*/
    `
    <div class="container-fluid">
      <!-- SELECT2 EXAMPLE -->
      <div class="card card-default">
        <div class="card-header">
          <h3 class="card-title">Top Reports</h3>

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
          <div class="row">
            <div class="col-md-12">
            <span class="float-right">
                <button class="btn btn-primary mr-4" @click="refresh"
                >Refresh</button>
                <hr>
            </span>
            </div>
            <div class="col-md-8">
            <div class="iq-card">
               <div class="iq-card-header d-flex justify-content-between">
                  <div class="iq-header-title">
                     <h4 class="card-title"></h4>
                  </div>

               </div>
               <div class="iq-card-header d-flex justify-content-between">

               </div>
               <div class="iq-card-body">
                    <h3>Most Popular Books</h3>
                  <div class="table-responsive">
                     <table id="popular_books-table" class="table table-striped table-bordered">
                        <thead>
                           <tr>
                              <th>Title</th>
                              <th>Avail. QTY</th>
                              <th>Total QTY</th>
                              <th>Issued *</th>
                           </tr>
                        </thead>
                        <tbody>
                           <tr v-for="r in results.popular_books">
                              <td><a :href="'/library/books/'+r.book_no+'/'">[% r.title %]</a></td>
                              <td>[% r.balance %]</td>
                              <td>[% r.total %]</td>
                              <td>[% r.qty %]</td>
                           </tr>
                        </tbody>
                        <tfoot>
                        <tr>
                           <th>Title</th>
                           <th>Avail. QTY</th>
                           <th>Total QTY</th>
                           <th>Issued *</th>
                        </tr>
                        </tfoot>
                     </table>
                  </div>
               </div>
            </div>
            </div>
            <!-- TOP CUSTOMERS -->
            <div class="col-md-4">
            <div class="iq-card">
               <div class="iq-card-header d-flex justify-content-between">
                  <div class="iq-header-title">
                     <h4 class="card-title"></h4>
                  </div>

               </div>
               <div class="iq-card-header d-flex justify-content-between">

               </div>
               <div class="iq-card-body">
                    <h4>Top Paying Customers</h4>
                  <div class="table-responsive">
                     <table id="highest_paying-table" class="table table-striped table-bordered">
                        <tbody>
                           <tr v-for="r in results.highest_paying">
                              <td><a :href="'/library/members/'+r.id+'/'">[% r.name %]</a></td>
                              <td>[% r.rfee %]</td>
                              <td>[% r.total %]</td>
                           </tr>
                        <!-- </tbody> -->
                     </table>
                  </div>
               </div>
            </div>
            </div>
            <!-- TOP CUSTOMERS -->
            <hr>
          </div>
          <div class="row">

            <div class="col-md-8">

              <!-- BAR CHART -->
              <div class="card card-success">
                <div class="card-header">
                  <h3 class="card-title">Most Popular Books Chart</h3>

                  <div class="card-tools">
                    <button type="button" class="btn btn-tool" data-card-widget="collapse">
                      <i class="fas fa-minus"></i>
                    </button>
                    <button type="button" class="btn btn-tool" data-card-widget="remove">
                      <i class="fas fa-times"></i>
                    </button>
                  </div>
                </div>
                <div class="card-body">
                  <div class="chart">
                    <canvas id="barChart" style="min-height: 250px; height: 350px; max-height: 350px; max-width: 100%;"></canvas>
                  </div>
                </div>
                <!-- /.card-body -->
              </div>
              <!-- /.card -->

            </div>
            <!-- /.col (LEFT) -->
            <div class="col-md-4">
              <!-- PIE CHART -->
              <div class="card card-danger">
                <div class="card-header">
                  <h3 class="card-title">Top Customer Chart</h3>

                  <div class="card-tools">
                    <button type="button" class="btn btn-tool" data-card-widget="collapse">
                      <i class="fas fa-minus"></i>
                    </button>
                    <button type="button" class="btn btn-tool" data-card-widget="remove">
                      <i class="fas fa-times"></i>
                    </button>
                  </div>
                </div>
                <div class="card-body">
                  <canvas id="pieChart" style="min-height: 250px; height: 350px; max-height: 350px; max-width: 100%;"></canvas>
                </div>
                <!-- /.card-body -->
              </div>
              <!-- /.card -->

            </div>
          </div>
          <!-- /.row -->

          <!-- <h5>Fetch books will be listed below.</h5> -->
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

        </div>
      </div>
      <!-- /.card -->
      <div class="row">
         <div class="col-sm-12">

         </div>
      </div>

    </div>

`,
    props:{

    },
    data(){
        return {
            results: {}
        }
    },
    computed: {
        //
        // getImage(){
        //     return this.user.photo ? '/media/'+this.user.photo : '/static/images/user/11.png';
        // }
    },
    methods: {
        async refresh(){
            $('#popular_books-table').DataTable().destroy();
            // $('#highest_paying-table').DataTable().destroy();

            this.results = []
            const res = await $.ajax({
                url: `/library/reports/top-report/`,
                type: "POST",
                headers: {
                    "X-CSRFToken": this.$getCookie("csrftoken"),
                },
                data: {
                }
            })
            if(res){
                this.prepareTable(res);
            } else {
                this.$notify('error', 'An error occured!')
            }
        },
        prepareTable(res){
            this.results = res;
            console.log(this.results)
            this.$setDatatable('#popular_books-table', [ 3, 'desc' ]);
            // this.$setDatatable('#highest_paying-table', [ 1, 'desc' ]);
            this.setChart(res);

        },
        setChart(res){
            // PIECHART
            var pieData        = {
              labels: res.highest_paying.map(a => a.name),
              datasets: [
                {
                  data: res.highest_paying.map(a => a.rfee),
                  backgroundColor : ['#f56954', '#00a65a', '#f39c12', '#00c0ef',
                      '#3c8dbc', '#d2d6de', '#212F3C', '#78281F', '#9F8681', '#9D5344'],
                }
              ]
            }

            var pieChartCanvas = $('#pieChart').get(0).getContext('2d')
            var pieData        = pieData;
            var pieOptions     = {
              maintainAspectRatio : false,
              responsive : true,
            }
            //Create pie or douhnut chart
            // You can switch between pie and douhnut using the method below.
            var pieChart = new Chart(pieChartCanvas, {
              type: 'pie',
              data: pieData,
              options: pieOptions
            })

            // BARCHART
            var bChartData = {
              labels  : res.popular_books.map(a => a.title),
              datasets: [
                {
                  label               : 'Balance',
                  backgroundColor     : 'rgba(60,141,188,0.9)',
                  borderColor         : 'rgba(60,141,188,0.8)',
                  pointRadius          : true,
                  pointColor          : '#3b8bba',
                  pointStrokeColor    : 'rgba(60,141,188,1)',
                  pointHighlightFill  : '#fff',
                  pointHighlightStroke: 'rgba(60,141,188,1)',
                  data                : res.popular_books.map(a => a.balance)
                },
                {
                  label               : 'Quantity',
                  backgroundColor     : 'rgba(210, 214, 222, 1)',
                  borderColor         : 'rgba(210, 214, 222, 1)',
                  pointRadius         : true,
                  pointColor          : 'rgba(210, 214, 222, 1)',
                  pointStrokeColor    : '#c1c7d1',
                  pointHighlightFill  : '#fff',
                  pointHighlightStroke: 'rgba(220,220,220,1)',
                  data                : res.popular_books.map(a => a.total)
                },
                {
                  label               : 'Issued',
                  backgroundColor     : 'rgba(120, 150, 10, 1)',
                  borderColor         : 'rgba(120, 150, 10, 1)',
                  pointRadius         : true,
                  pointColor          : 'rgba(120, 150, 10, 1)',
                  pointStrokeColor    : '#c1aed0',
                  pointHighlightFill  : '#fff',
                  pointHighlightStroke: 'rgba(120, 150, 10,1)',
                  data                : res.popular_books.map(a => a.qty)
                }
              ]
            }

            var barChartCanvas = $('#barChart').get(0).getContext('2d')
            var barChartData = $.extend(true, {}, bChartData)
            var temp0 = bChartData.datasets[0]
            var temp1 = bChartData.datasets[1]
            barChartData.datasets[0] = temp1
            barChartData.datasets[1] = temp0

            var barChartOptions = {
              responsive              : true,
              maintainAspectRatio     : false,
              datasetFill             : false
            }

            var barChart = new Chart(barChartCanvas, {
              type: 'bar',
              data: barChartData,
              options: barChartOptions
            })
        },
        setBarChart(){

        }
    },
    mounted(){
            setTimeout(()=>{
                this.refresh();
            }, 2000)
    }
})

var statistics_struct = (
    `
    <div class="p-4">
        <div class="dropdown mb-5">
            <button class="text-start btn btn-primary dropdown-toggle" type="button" id="habit_list_dropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
            Select habit to get analysis
            </button>
            <div id="habit_dd_item_list" class="dropdown-menu bg-primary-subtle" aria-labelledby="habit_list_dropdown">
            </div>
        </div>

        <div class="row px-0 mx-0 justify-content-evenly d-none graph_div mb-5 gap-5" id="graph_div">
            <div class="col-5 col-xxl-12 rounded-5 p-4 position-relative" style="background-color:#f4f4f4;">            
                <div class="mb-3" >
                    <i>How many days finished vs missed</i>
                </div>
                <svg id="bar-chart" class="w-100"></svg>
                <div class="position-absolute filter-btn top-0 end-0 mt-3 me-3 ">
                    <button class="btn btn-light border d-sm-block mb-2" onclick=weekly_analysis(this)>Week</button>    
                    <button class="btn btn-light border d-sm-block mb-2" onclick=monthly_analysis(this)>Month</button>    
                    <button class="btn btn-light border d-sm-block mb-2" onclick=yearly_analysis(this)>Year</button>    
                    <button class="btn btn-light border d-sm-block mb-2" onclick=max_analysis(this)>Max</button>    
                </div>
            </div>
            <div class="col-5 col-xxl-12 rounded-5 p-4 position-relative" style="background-color:#f4f4f4;">
                <div class="mb-3" >
                    <i>Progress through habit duration</i>
                </div>
                <svg id="line-chart" class="w-100"></svg>
                <div class="position-absolute filter-btn top-0 end-0 mt-3 me-3 ">
                    <button class="btn btn-light border d-sm-block mb-2" onclick=weekly_analysis(this)>Week</button>    
                    <button class="btn btn-light border d-sm-block mb-2" onclick=monthly_analysis(this)>Month</button>    
                    <button class="btn btn-light border d-sm-block mb-2" onclick=yearly_analysis(this)>Year</button>    
                    <button class="btn btn-light border d-sm-block mb-2" onclick=max_analysis(this)>Max</button>    
                </div>
            </div>
        </div>
        <div class="row px-0 mx-0 justify-content-evenly d-none graph_div gap-5" id="graph_div">
            <div class="col-5 col-xxl-12 rounded-5 p-4 position-relative" style="background-color:#f4f4f4;">
                <div class="mb-4">
                    <i>Hours distribution corresponding to days of week</i>
                </div>
                <svg id="pie-chart" class="w-100"></svg>
                <div class="position-absolute filter-btn top-0 end-0 mt-3 me-3 ">
                <button class="btn btn-light border d-sm-block mb-2" onclick=weekly_analysis(this)>Week</button>    
                <button class="btn btn-light border d-sm-block mb-2" onclick=monthly_analysis(this)>Month</button>    
                <button class="btn btn-light border d-sm-block mb-2" onclick=yearly_analysis(this)>Year</button>    
                <button class="btn btn-light border d-sm-block mb-2" onclick=max_analysis(this)>Max</button>    
              </div>
            </div>
            
            </div>
        </div>
       
        <div class="tooltip" id="tooltip" style="display: none;"></div>
    </div>
    `
)
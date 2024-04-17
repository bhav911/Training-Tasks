
var Add_Goal = 
`
<div id="main3" class="p-4">
<!-- Button trigger modal -->
<button
  type="button"
  class="btn btn-primary btn-lg"
  data-bs-toggle="modal"
  data-bs-target="#modalId"
  id="add_new_habit_btn"
>
  Add
</button>      
<!-- Modal -->
<div
  class="modal fade"
  id="modalId"
  tabindex="-1"
  role="dialog"
  aria-labelledby="modalTitleId"
  aria-hidden="true"
>
  <div class="modal-dialog modal-xl modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="modalTitleId">
          Add New Habit
        </h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
          id="add_habit_btn_close"
        ></button>
      </div>
      <div class="modal-body bg-secondary-subtle rounded-bottom">
        <div class="mx-auto px-4 pt-4">
          <form action="#" id="new-habit-form">
            <div class="row">
              <div class="col-lg-6 col-12 ">
                <div class="bg-secondary-subtle form-floating bg-white">
                <input type="text" class="form-control mb-3 user-inp" id="habit_title" name="habit_title" placeholder="aa">   
                  <label for="habit_title">Habit</label>             
                </div>              
              </div>
              <div class="col-lg-6 col-12 ">
                <div class="bg-secondary-subtle form-floating bg-white">
                <textarea name="habit_note" id="habit_note" cols="30" rows="1" class="form-control mb-3 user-inp" placeholder=""></textarea>
                  <label for="habit_note">Habit Note</label>             
                </div>              
              </div>
              
              <div class="col-xl-3 col-lg-6 col-12 ">
                <div class="bg-secondary-subtle form-floating bg-white">
                <input type="date" class="form-control mb-3 user-inp" id="habit_start_date" name="habit_start_date">   
                  <label for="habit_start_date">Start date</label>             
                </div>              
              </div>
              <div class="col-xl-3 col-lg-6 col-12 ">
                <div class="bg-secondary-subtle form-floating bg-white">
                <input type="date" class="form-control mb-3 user-inp" id="habit_end_date" name="habit_end_date">   
                  <label for="habit_end_date">End date</label>             
                </div>              
              </div>
              <div class="col-xl-3 col-lg-6 col-12 ">
                <div class="bg-secondary-subtle form-floating bg-white">
                <input type="time" class="form-control mb-3 user-inp" id="habit_desired_time" name="habit_desired_time">   
                  <label for="habit_desired_time">Desired Time of Habit</label>             
                </div>              
              </div>
              <div class="col-xl-3 col-lg-6 col-12 ">
                <div class="bg-secondary-subtle form-floating bg-white">
                  <input type="time" class="form-control mb-3 user-inp" id="habit_desired_duration" name="habit_desired_duration">   
                  <label for="habit_desired_duration">Desired Duration of Habit</label>             
                </div> 
              </div>
              <div class="col-12  px-4">
                <div class="row mb-3 py-3 rounded-3 justify-content-between mx-0 px-0" style="border: 4px solid #f4f4f4;">
                  <div class="col-md-2 col-9">Repeat Every</div>
                  <div class="col-md-10 col-sm-3 text-md-end">
                    <div class="d-md-block d-flex flex-column">
                      <div class="form-check form-check-inline ">
                        <input class="form-check-input" type="checkbox" id="rep_all" name="rep_all" value="-1"/>
                        <label class="form-check-label" for="rep_all">All</label>
                      </div>
                      <div class="form-check form-check-inline ">
                        <input class="form-check-input" type="checkbox" id="rep_sun" name="rep_sun" value="0"/>
                        <label class="form-check-label" for="rep_sun">Sun</label>
                      </div>
                      <div class="form-check form-check-inline ">
                        <input class="form-check-input" type="checkbox" id="rep_mon" name="rep_mon" value="1"/>
                        <label class="form-check-label" for="rep_mon">Mon</label>
                      </div>                          
                      <div class="form-check form-check-inline ">
                        <input class="form-check-input" type="checkbox" id="rep_tue" name="rep_tue" value="2"/>
                        <label class="form-check-label" for="rep_tue">Tue</label>
                      </div>                          
                      <div class="form-check form-check-inline ">
                        <input class="form-check-input" type="checkbox" id="rep_wed" name="rep_wed" value="3"/>
                        <label class="form-check-label" for="rep_wed">Wed</label>
                      </div>                          
                      <div class="form-check form-check-inline ">
                        <input class="form-check-input" type="checkbox" id="rep_thur" name="rep_thur" value="4"/>
                        <label class="form-check-label" for="rep_thur">Thur</label>
                      </div>                          
                      <div class="form-check form-check-inline ">
                        <input class="form-check-input" type="checkbox" id="rep_fri" name="rep_fri" value="5"/>
                        <label class="form-check-label" for="rep_fri">Fri</label>
                      </div>                          
                      <div class="form-check form-check-inline ">
                        <input class="form-check-input" type="checkbox" id="rep_sat" name="rep_sat" value="6"/>
                        <label class="form-check-label" for="rep_sat">Sat</label>
                      </div>
                    </div>
                  </div>
                </div>              
              </div>
            </div>  
            <div class="modal-footer">
              <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Save</button>
            </div>
          </form>
        </div>
      </div>
      
    </div>
  </div>
</div>





<table id="habit-table" class="w-100 table table-striped table-hover nowrap">
  <thead>
    <tr class="bg-primary-subtle border-primary border">
      <th>Details</th>
      <th>Habit</th>
      <th>Habit Note</th>            
      <th>Action</th>
    </tr>
  </thead>
  <tbody class="border">          
  </tbody>
</table>

</div>
`
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace ParkingFinals
{
    public partial class DashboardForm : Form
    {
        private const int TOTAL_SLOTS = 20;

        public DashboardForm()
        {
            InitializeComponent();

            this.FormClosed += DashboardForm_FormClosed;
            this.Load += DashboardForm_Load;             // add this line

        }
        private void DashboardForm_FormClosed(object sender, FormClosedEventArgs e)
        {
            Application.Exit(); // closes the entire app
        }
        private void DashboardForm_Load(object sender, EventArgs e)
        {
            dataGridView1.AllowUserToAddRows = false;
            UpdateSlotLabels();
        }
        private void UpdateSlotLabels()
        {
            int occupiedSlots = 0;

            foreach (DataGridViewRow row in dataGridView1.Rows)
            {
                if (row.IsNewRow) continue;

                // Check if Time In (Index 3) is filled and Time Out (Index 4) is empty
                if (row.Cells[3].Value != null &&
                    (row.Cells[4].Value == null || string.IsNullOrWhiteSpace(row.Cells[4].Value.ToString())))
                {
                    occupiedSlots++;
                }
            }

            int vacantSlots = TOTAL_SLOTS - occupiedSlots;
            if (vacantSlots < 0) vacantSlots = 0;

            // FIX: Target the specific labels meant for the numbers
            // Replace 'label5' and 'label6' with whatever the names of 
            // the labels next to "Slots Available" and "Occupied" are.
            lblVacantCount.Text = vacantSlots.ToString();
            lblOccupiedCount.Text = occupiedSlots.ToString();
        }
        private void panel1_Paint(object sender, PaintEventArgs e)
        {

        }

        private void label1_Click(object sender, EventArgs e)
        {

        }

        private void label2_Click(object sender, EventArgs e)
        {

        }

        private void label3_Click(object sender, EventArgs e)
        {

        }

        private void label4_Click(object sender, EventArgs e)
        {

        }

        private void button2_Click(object sender, EventArgs e)
        {
            // 1. Check if the user actually selected a row
            if (dataGridView1.SelectedRows.Count > 0)
            {
                DataGridViewRow selectedRow = dataGridView1.SelectedRows[0];

                // 2. Check if the vehicle has already timed out
                // We check column index 4 (Time Out column)
                if (selectedRow.Cells[4].Value != null && !string.IsNullOrWhiteSpace(selectedRow.Cells[4].Value.ToString()))
                {
                    MessageBox.Show("This vehicle has already left the parking lot.", "Notice");
                    return;
                }

                // 3. Record the Time Out
                DateTime timeIn = DateTime.Parse(selectedRow.Cells[3].Value.ToString());
                DateTime timeOut = DateTime.Now; // Current time of clicking the button
                selectedRow.Cells[4].Value = timeOut.ToString("yyyy-MM-dd HH:mm");

                // 4. Calculate Duration
                TimeSpan duration = timeOut - timeIn;
                double totalHours = Math.Ceiling(duration.TotalHours); // Rounds up (e.g., 1.2 hours becomes 2 hours)
                if (totalHours <= 0) totalHours = 1; // Minimum 1 hour charge

                selectedRow.Cells[5].Value = $"{totalHours} hr(s)";

                // 5. Calculate Amount (Change 40 to your preferred hourly rate)
                double hourlyRate = 40.00;
                double totalFee = totalHours * hourlyRate;
                selectedRow.Cells[6].Value = "P" + totalFee.ToString("N2");

                // 6. Update the counter labels (Vacant/Occupied)
                UpdateSlotLabels();

                MessageBox.Show($"Check-out Successful!\nTotal Fee: P{totalFee:N2}", "Parking Receipt");
            }
            else
            {
                MessageBox.Show("Please click on a row in the table first to select the vehicle leaving.", "Selection Required");
            }
        }

        private void label5_Click(object sender, EventArgs e)
        {

        }

        private void label6_Click(object sender, EventArgs e)
        {

        }

        private void dataGridView1_CellContentClick(object sender, DataGridViewCellEventArgs e)
        {

        }

        private void label7_Click(object sender, EventArgs e)
        {

        }

        private void label8_Click(object sender, EventArgs e)
        {

        }

        private void DashboardFormClosed(object sender, EventArgs e)
        {
            Application.Exit();

        }

        private void btnAdd_Click(object sender, EventArgs e)
        {
            // 1. Get values from your TextBoxes
            string plate = txtLicensePlate.Text.Trim();
            string brand = txtBrand.Text.Trim();
            string color = txtColor.Text.Trim();
            string timeIn = DateTime.Now.ToString("yyyy-MM-dd HH:mm");

            // 2. Simple Validation: Don't add if plate is empty
            if (string.IsNullOrEmpty(plate))
            {
                MessageBox.Show("Please enter a License Plate.");
                return;
            }

            // 3. Add the data to the grid
            // The order here MUST match the order of columns in your Designer
            dataGridView1.Rows.Add(plate, brand, color, timeIn, "", "", "");

            // 4. Update your slot counters
            UpdateSlotLabels();

            // 5. Clear the boxes for the next entry
            txtLicensePlate.Clear();
            txtBrand.Clear();
            txtColor.Clear();
            txtLicensePlate.Focus();
        }

        private void dtpParking_DateChanged(object sender, DateRangeEventArgs e)
        {

        }
    }
}

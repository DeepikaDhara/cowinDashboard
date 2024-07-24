// Write your code here
import {PieChart, Legend, Cell, Pie} from 'recharts'

const VaccinationByGender = props => {
  const {vaccinationGenderDetails} = props
  return (
    <div className="VaccinationByGender-container">
      <h1 className="VaccinationByGender-heading">Vaccination by age</h1>
      <PieChart width={1000} height={300}>
        <Pie
          data={vaccinationGenderDetails}
          cx="50%"
          cy="60%"
          startAngle={180}
          endAngle={0}
          innerRadius="30%"
          outerRadius="60%"
          dataKey="count"
        >
          <Cell name="Male" fill="#f54394" />
          <Cell name="Female" fill="#5a8dee" />
          <Cell name="Others" fill="#64c2a6" />
          <Legend
            iconType="circle"
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{fontSize: 12, fontFamily: 'Roboto'}}
          />
        </Pie>
      </PieChart>
    </div>
  )
}
export default VaccinationByGender

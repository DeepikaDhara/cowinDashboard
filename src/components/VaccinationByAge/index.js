// Write your code here
import {PieChart, Legend, Cell, Pie} from 'recharts'

const VaccinationByAge = props => {
  const {vaccinationAgeDetails} = props
  return (
    <div className="VaccinationByAge-container">
      <h1 className="VaccinationByAge-heading">Vaccination by age</h1>
      <PieChart width={1000} height={300}>
        <Pie
          data={vaccinationAgeDetails}
          cx="50%"
          cy="30%"
          outerRadius="60%"
          dataKey="count"
        >
          <Cell name="18-44" fill="#2d87bb" />
          <Cell name="44-60" fill="#a3df9f" />
          <Cell name="Above 60" fill="#64c2a6" />
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
export default VaccinationByAge

import {useEffect, useState} from "react";
import apiClient from "@/api/apiClient.ts";
import {Link, useNavigate} from 'react-router-dom';

type OrdersListResult = {
  id: number;
  title: string;
  description: string;
  customer_id: number;
  performer_id: number;
  completed: boolean;
}

const Deals = () => {
  const [ordersList, setOrdersList] = useState<OrdersListResult[]>([]);
  const navigate = useNavigate();

  async function fetchOrders() {
    try {
      const response = await apiClient.get('/deals/')
      if (response.data) {
        setOrdersList(response.data)
      }
    } catch (error) {
      console.error('API Error:', error)
    }
  }

  useEffect(() => {
    fetchOrders();
  }, [])

  return (
    <div>
      <h1>Deals List</h1>
      <Link className="btn btn-primary my-3" to="/deals/create">Add new deal</Link>
      <table className="table">
        <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Title</th>
          <th scope="col">Completed</th>
        </tr>
        </thead>
        <tbody>
        {ordersList.map((deal) => (
          <tr key={deal.id} onClick={() => navigate(`/deals/${deal.id}/`)} style={{cursor: "pointer"}}>
            <th scope="row">{deal.id}</th>
            <td>{deal.title}</td>
            <td>{deal.completed.toString()}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}

export default Deals

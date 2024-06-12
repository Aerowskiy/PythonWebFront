import {useEffect, useState} from "react";
import apiClient from "@/api/apiClient.ts";
import {useParams} from "react-router-dom";

type Order = {
  id: number;
  title: string;
  description: string;
  customer_id: number;
  performer_id: number;
  completed: boolean;
}

const DealDetails = () => {
  const { id } = useParams();

  const [deal, setOrder] = useState<Order | null>(null)

  useEffect(() => {
    fetchOrderInfo();
  }, [])

  async function fetchOrderInfo() {
    try {
      const response = await apiClient.get(`/deals/${id}`)
      if (response.data) {
        setOrder(response.data)
      }
    } catch (error) {
      console.error('API Error:', error)
    }
  }

  const markAsCompleted = async () => {
    await apiClient.patch(`/deals/${id}`);
    fetchOrderInfo();
  }

  return (
    <div>
      <h1>Order Information</h1>
      <div>Title: {deal?.title}</div>
      <div>Description: {deal?.description}</div>
      <div>Customer ID: {deal?.customer_id}</div>
      <div>Performer ID: {deal?.performer_id}</div>
      <div>Completed: {deal?.completed?.toString()}</div>
      <button type="button" className="btn btn-success mt-3" onClick={() => markAsCompleted()}>Mark as completed</button>
    </div>
  );
}

export default DealDetails

export default function CourseTable({ customers }: { customers: any[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Course</th>
            <th className="py-2 px-4 border-b">Reviews</th>
            <th className="py-2 px-4 border-b">Customer</th>
            <th className="py-2 px-4 border-b">Type</th>
            <th className="py-2 px-4 border-b">Country</th>
            <th className="py-2 px-4 border-b">Joined</th>
            <th className="py-2 px-4 border-b">Total Amount</th>
            <th className="py-2 px-4 border-b">Last Order</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b">Communication</td>
              <td className="py-2 px-4 border-b">{index + 1}</td>
              <td className="py-2 px-4 border-b">{customer.name}</td>
              <td className="py-2 px-4 border-b">{customer.type}</td>
              <td className="py-2 px-4 border-b">{customer.country}</td>
              <td className="py-2 px-4 border-b">{customer.joined}</td>
              <td className="py-2 px-4 border-b">{customer.totalAmount}</td>
              <td className="py-2 px-4 border-b">{customer.lastOrder}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

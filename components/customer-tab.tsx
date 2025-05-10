import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CustomerTab() {
  const customers = [
    {
      id: 1,
      name: "Ronald Richards",
      type: "Student",
      country: "India",
      joined: "15 May 2020 8:00 am",
      amount: "$ 500.00",
      order: "12542",
    },
    {
      id: 2,
      name: "Darlene Robertson",
      type: "Student",
      country: "India",
      joined: "15 May 2020 8:30 am",
      amount: "$ 500.00",
      order: "46540",
    },
    {
      id: 3,
      name: "Jerome Bell",
      type: "Teacher",
      country: "Sri Lanka",
      joined: "15 May 2020 9:30 am",
      amount: "$ 500.00",
      order: "68745",
    },
    {
      id: 4,
      name: "Kristin Watson",
      type: "Student",
      country: "India",
      joined: "15 May 2020 8:00 am",
      amount: "$ 500.00",
      order: "34475",
    },
    {
      id: 5,
      name: "Bessie Cooper",
      type: "Teacher",
      country: "Sri Lanka",
      joined: "15 May 2020 8:00 am",
      amount: "$ 500.00",
      order: "72145",
    },
    {
      id: 6,
      name: "Cameron Williamson",
      type: "Student",
      country: "India",
      joined: "15 May 2020 8:30 am",
      amount: "$ 500.00",
      order: "97451",
    },
  ];

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead>Total Amount</TableHead>
            <TableHead>Last Order</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell>{customer.id}</TableCell>
              <TableCell>{customer.name}</TableCell>
              <TableCell>{customer.type}</TableCell>
              <TableCell>{customer.country}</TableCell>
              <TableCell>{customer.joined}</TableCell>
              <TableCell>{customer.amount}</TableCell>
              <TableCell>{customer.order}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-center p-4 border-t">
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 min-w-8 bg-primary text-primary-foreground hover:bg-primary/90"
          >
            1
          </Button>
          <Button variant="outline" size="sm" className="h-8 min-w-8">
            2
          </Button>
          <Button variant="outline" size="sm" className="h-8 min-w-8">
            3
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

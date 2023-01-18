<script>
  const invoice = {
    id: 15,
    invoices: [
      {
        invoiceId: "SLrdfKmWZxZ3JMaTCJMcjh",
        invoiceUrl:
          "https://mainnet.demo.btcpayserver.org/invoice?id=SLrdfKmWZxZ3JMaTCJMcjh",
        price: 1,
        createdAt: "2022-10-02T16:29:11+00:00",
        expiredAt: "2022-10-02T16:44:11+00:00",
      },
    ],
    orderProductInventories: [
      {
        productInventory: { product: { name: "LOL", webId: "lol" } },
        quantity: 1,
      },
    ],
    totalPrice: 1,
    totalQuantity: 1,
  };
</script>

<div class="card w-96 bg-secondary text-secondary-content">
  <div class="card-body">
    <h2 class="card-title">Payment</h2>
    <p>Total Sum: {invoice.totalPrice}</p>
    <p>Pay until: {invoice.invoices[0].expiredAt}</p>
    <div class="card-actions justify-end">
      <a class="btn btn-primary" href={invoice.invoices[0].invoiceUrl}
        >Buy Now</a
      >
    </div>
  </div>
</div>

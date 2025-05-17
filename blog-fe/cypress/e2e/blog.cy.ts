describe("View Blog Detail", () => {
  it("display list of blog post", () => {
    cy.visit("/");
    cy.get('[data-cy="blog-item"]').should("have.length.greaterThan", 0);
  });

  it("navigate to detail blog", () => {
    cy.visit("/");
    cy.get('[data-cy="blog-item"]').first().click();

    cy.url().should("include", "/blog/");
    cy.get("img").should("be.visible");
  });
});

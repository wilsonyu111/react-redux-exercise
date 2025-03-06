import { fireEvent, screen, waitFor } from "@testing-library/react"
import App from "../../App"
import { renderWithProviders } from "../../utils/test-utils"
import userEvent from "@testing-library/user-event"

const initialCount = 4

test("list table should have 4 row to begin with", async () => {
  renderWithProviders(<App />);

  const rowId = screen.getAllByTestId("table-row-id");
  const rowName = screen.getAllByTestId("table-row-name");
  const rowCat = screen.getAllByTestId("table-row-cat");
  const rowDel = screen.getAllByTestId("table-row-del");

  expect(
    rowId.length === initialCount &&
      rowName.length === initialCount &&
      rowCat.length === initialCount &&
      rowDel.length === initialCount,
  ).toBeTruthy();
})

test("list table should have x+1 amount after being clicked", async () => {
  renderWithProviders(<App />);

  let rowId = screen.getAllByTestId("table-row-id");
  let rowName = screen.getAllByTestId("table-row-name");
  let rowCat = screen.getAllByTestId("table-row-cat");
  let rowDel = screen.getAllByTestId("table-row-del");
  const button = screen.getByRole("button", { name: /Add Random Item/i });
  await userEvent.click(button);
  rowId = screen.getAllByTestId("table-row-id");
  rowName = screen.getAllByTestId("table-row-name");
  rowCat = screen.getAllByTestId("table-row-cat");
  rowDel = screen.getAllByTestId("table-row-del");

  expect(
    rowId.length === initialCount + 1 &&
      rowName.length === initialCount + 1 &&
      rowCat.length === initialCount + 1 &&
      rowDel.length === initialCount + 1,
  ).toBeTruthy();
})

test("list table should have 0 row after removing all", async () => {
  renderWithProviders(<App />);

  const buttons = screen.getAllByRole("button", { name: /X/i });

  for (let i = 0; i < buttons.length; i++) {
    await userEvent.click(buttons[i]);
  }

  // screen.getAllByTestId("table-row-id")
  await waitFor(() => screen.queryAllByTestId("table-row-id"), {
    timeout: 2000,
  });
  expect(screen.queryAllByTestId("table-row-id").length).toBe(0);

  await waitFor(() => screen.queryAllByTestId("table-row-name"), {
    timeout: 2000,
  });
  expect(screen.queryAllByTestId("table-row-name").length).toBe(0);

  await waitFor(() => screen.queryAllByTestId("table-row-cat"), {
    timeout: 2000,
  });
  expect(screen.queryAllByTestId("table-row-cat").length).toBe(0);

  await waitFor(() => screen.queryAllByTestId("table-row-del"), {
    timeout: 2000,
  });
  expect(screen.queryAllByTestId("table-row-del").length).toBe(0);
})

test("list table should have 3 row after removing 1", async () => {
    renderWithProviders(<App />);

    const buttons = screen.getAllByRole("button", { name: /X/i });

    await userEvent.click(buttons[0]);

    await waitFor(() => screen.queryAllByTestId("table-row-id"), {
      timeout: 2000,
    })
    expect(screen.queryAllByTestId("table-row-id").length).toBe(initialCount - 1);

    await waitFor(() => screen.queryAllByTestId("table-row-id"), {
      timeout: 2000,
    })
    expect(screen.queryAllByTestId("table-row-id").length).toBe(initialCount - 1);
  
    await waitFor(() => screen.queryAllByTestId("table-row-name"), {
      timeout: 2000,
    })
    expect(screen.queryAllByTestId("table-row-name").length).toBe(initialCount - 1);
  
    await waitFor(() => screen.queryAllByTestId("table-row-cat"), {
      timeout: 2000,
    })
    expect(screen.queryAllByTestId("table-row-cat").length).toBe(initialCount - 1);
  
    await waitFor(() => screen.queryAllByTestId("table-row-del"), {
      timeout: 2000,
    })
    expect(screen.queryAllByTestId("table-row-del").length).toBe(initialCount - 1);
  })

test("selected item should appear in the list view component and gone after removing item from table", async () => {
  // Render the component wrapped with the Redux provider
  renderWithProviders(<App />);

  // get the row button
  const buttons = screen.getAllByTestId("table-row-id");
  const removeButtons = screen.getAllByRole("button", { name: /X/i });
  const itemText = buttons.map(item=> {
    return item.textContent;
  });

  expect(buttons.length === initialCount);

  // loop through the itemText from the button and compare the id with the current row id after clicked
  for (let i=0; i<buttons.length; i++)
  {
    // test clicking on row and showing up on view component
    await userEvent.click(buttons[i]);
    await waitFor(() => screen.queryAllByTestId("table-row-select-val"), { timeout: 2000 });
    expect(screen.queryAllByTestId("table-row-select-val").length, "length is not 4").toBe(4);
    const rowid = screen.queryAllByTestId("table-row-select-val")[0].textContent;
    expect(rowid === itemText[i], "row id does not match, expect:" + itemText[i] + " actual: " + rowid).toBeTruthy();

    // test removing item after it showed up on view, the view should become empty
    await userEvent.click(removeButtons[i]);
    await waitFor(() => screen.queryAllByTestId("table-row-select-empty-val"), { timeout: 2000 });
    expect(screen.queryAllByTestId("table-row-select-empty-val").length, "empty div should be present").toBe(1);

  }


});



import { fireEvent, screen, waitFor } from "@testing-library/react"
import App from "../../App"
import { renderWithProviders } from "../../utils/test-utils"
import userEvent from "@testing-library/user-event"

const initialCount = 4
test("list table should have 4 row to begin with", async () => {
    renderWithProviders(<App />);
  
    const idButton = screen.getByTestId("id-radio-button");
    const nameButton = screen.getByTestId("name-radio-button");
    const searchBar = screen.getByTestId("search-bar");
    
    expect(idButton && nameButton && searchBar).toBeTruthy();

    let searchText = "Search Name"
    expect(searchBar, `initial search bar should have \"${searchText}\" text`).toHaveAttribute('placeholder', searchText);
    
    // switch to ID search
    searchText = "Search ID"
    await userEvent.click(idButton);
    expect(searchBar, `initial search bar should have \"${searchText}\" text`).toHaveAttribute('placeholder', searchText);

    // switch back to Name search
    searchText = "Search Name"
    await userEvent.click(nameButton);
    expect(searchBar, `initial search bar should have \"${searchText}\" text`).toHaveAttribute('placeholder', searchText);

  })

test("searching item that exist in the table should appear in the view component and empty if it doesn't", async () => {
    renderWithProviders(<App />);
    
    
    const idButton = screen.getByTestId("id-radio-button");
    const nameButton = screen.getByTestId("name-radio-button");
    const submitBtn = screen.getByTestId("submit-search-btn");
    const searchBar = screen.getByTestId("search-bar");
    let rowId = screen.getAllByTestId("table-row-id");
    let rowName = screen.getAllByTestId("table-row-name");
    
    expect(idButton && nameButton && searchBar && submitBtn).toBeTruthy();
    // switch to ID search
    await userEvent.click(idButton);
    for (let i=0; i<initialCount; i++)
    {
        let tableId = rowId[i].textContent;
        expect (tableId, "tableId should be a string").toBeTruthy();
        await userEvent.type(searchBar, tableId);
        await userEvent.click(submitBtn);
        await waitFor(() => screen.queryAllByTestId("table-row-select-val"), { timeout: 2000 });
        const viewId = screen.queryAllByTestId("table-row-select-val");
        expect(screen.queryAllByTestId("table-row-select-val").length, "length is not 4").toBe(4);
        expect(rowId[i].textContent === viewId[0].textContent, "row id does not match, expect:" + rowId[i].textContent + " actual: " + viewId[i].textContent).toBeTruthy();
    }

    // switch to Name search
    await userEvent.click(nameButton);
    for (let i=0; i<initialCount; i++)
    {
        let tableItemName = rowName[i].textContent;
        expect (tableItemName, "tableName should be a string").toBeTruthy();
        await userEvent.type(searchBar, tableItemName);
        await userEvent.click(submitBtn);
        await waitFor(() => screen.queryAllByTestId("table-row-select-val"), { timeout: 2000 });
        const viewId = screen.queryAllByTestId("table-row-select-val");
        expect(screen.queryAllByTestId("table-row-select-val").length, "length is not 4").toBe(4);
        expect(rowId[i].textContent === viewId[0].textContent, "row id does not match, expect:" + rowId[i].textContent + " actual: " + viewId[i].textContent).toBeTruthy();
    }
    
    
  })
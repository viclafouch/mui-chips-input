/* eslint-disable import/no-extraneous-dependencies */
import { fireEvent, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

export function getInputElement() {
  return screen.getByRole<HTMLInputElement>('textbox')
}
export function getClearAllButton() {
  return screen.queryByTestId('CloseIcon')
}

export async function typeInInputElement(
  value: string
): Promise<{ result: string }> {
  const inputElement = getInputElement()
  await userEvent.type(inputElement, value, { delay: 1 })
  return { result: inputElement.value }
}

export async function addChip(chipValue: string) {
  await typeInInputElement(chipValue)
  await userEvent.keyboard('{enter}')
}

export function deleteChip(chipIndex: number) {
  const deleteSvg = screen.getAllByTestId('CancelIcon')[chipIndex]
  fireEvent.click(deleteSvg)
}

export function clearAllChips() {
  return fireEvent.click(getClearAllButton() as HTMLElement)
}

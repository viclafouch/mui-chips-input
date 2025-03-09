import { type RenderResult } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

export function getInputElement(screen: RenderResult) {
  return screen.getByRole('textbox') as HTMLInputElement
}

export function getClearAllButton(screen: RenderResult) {
  return screen.queryByTestId('CloseIcon')
}

export async function typeInInputElement(
  screen: RenderResult,
  value: string
): Promise<{ result: string }> {
  const inputElement = getInputElement(screen)
  await userEvent.type(inputElement, value, { delay: 1 })

  return { result: inputElement.value }
}

export async function addChip(screen: RenderResult, chipValue: string) {
  await typeInInputElement(screen, chipValue)
  await userEvent.keyboard('{enter}')
}

export async function deleteChip(screen: RenderResult, chipIndex: number) {
  const deleteSvg = screen.getAllByTestId('CancelIcon')[chipIndex]
  await userEvent.click(deleteSvg)
}

export function clearAllChips(screen: RenderResult) {
  return userEvent.click(getClearAllButton(screen) as HTMLElement)
}

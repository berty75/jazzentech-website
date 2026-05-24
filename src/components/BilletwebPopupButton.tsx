'use client'

import React from 'react'

interface BilletwebPopupButtonProps {
  /** URL "conviviale" du billet, ex: https://www.billetweb.fr/jazz-en-tech&quick=7024288 */
  ticketUrl: string
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
  ariaLabel?: string
}

const SHOP_BASE = 'https://www.billetweb.fr/shop.php?event=jazz-en-tech&popup=1'

/**
 * Ouvre la billetterie Billetweb en pop-up, positionnée sur le bon concert
 * grâce au paramètre `quick` extrait de ticketUrl.
 * Rendu en <a> avec href de repli : clic droit / nouvel onglet fonctionnent,
 * et si le pop-up est bloqué on bascule sur un nouvel onglet.
 */
export default function BilletwebPopupButton({
  ticketUrl,
  className,
  style,
  children,
  ariaLabel,
}: BilletwebPopupButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const match = ticketUrl.match(/quick=(\d+)/)
    const quick = match ? match[1] : ''
    const popupUrl = quick ? `${SHOP_BASE}&quick=${quick}` : SHOP_BASE
    const features =
      'width=650,height=600,top=100,left=100,toolbar=no,resizable=yes,scrollbars=yes,status=no'
    const popup = window.open(popupUrl, 'Reserver', features)
    if (popup) {
      popup.focus()
    } else {
      // Pop-up bloqué : repli sur un nouvel onglet
      window.open(ticketUrl, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <a
      href={ticketUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={className}
      style={style}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  )
}

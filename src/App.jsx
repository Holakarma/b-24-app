import React from 'react';
import { Workspace } from './components/workspace/workspace';
import { PrimeReactProvider, addLocale } from 'primereact/api';
import { locale } from './utils/localePR';

/* BX24.callMethod('entity.delete', {ENTITY:'dashboards'}, res => {
    console.log(res.data())
}) */

export function App({ oldDashboards }) {
    const lang = 'ru';
    addLocale(lang, locale);
    return (
        <PrimeReactProvider value={lang}>
            <Workspace oldDashboards={oldDashboards} />
        </PrimeReactProvider>
    );
}

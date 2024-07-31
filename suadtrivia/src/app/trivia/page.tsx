import { NativeSelect } from '@mantine/core';

export default function Page() {
    return (
        <NativeSelect
          data={[
            { value: '1', label: 'One' },
            { value: '2', label: 'Two' },
            { value: '3', label: 'Three' },
            { value: '4', label: 'Four' },
          ]}/>
        );

}
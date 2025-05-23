'use client'

// React Imports
import { useEffect, useMemo, useState } from 'react'

// MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import TablePagination from '@mui/material/TablePagination'

// Third-party Imports
import classnames from 'classnames'
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  createColumnHelper
} from '@tanstack/react-table'
import { rankItem } from '@tanstack/match-sorter-utils'

// Component Imports
import TablePaginationComponent from '@components/TablePaginationComponent'
import CustomTextField from '@core/components/mui/TextField'

// Icon Imports
import ChevronRight from '@menu/svg/ChevronRight'

// Style Imports
import styles from '@core/styles/table.module.css'


const defaultData = [
    {
      id: 1,
      avatar: '8.png',
      fullName: "Korrie O'Crevy",
      post: 'Nuclear Power Engineer',
      email: 'kocrevy0@thetimes.co.uk',
      city: 'Krasnosilka',
      start_date: '09/23/2016',
      salary: 23896.35,
      age: 61,
      experience: '1 Year',
      status: 2
    },
    {
      id: 7,
      avatar: '',
      fullName: 'Eileen Diehn',
      post: 'Environmental Specialist',
      email: 'ediehn6@163.com',
      city: 'Lampuyang',
      start_date: '10/15/2017',
      salary: 18991.67,
      age: 59,
      experience: '9 Years',
      status: 3
    },
    {
      id: 11,
      avatar: '',
      fullName: 'De Falloon',
      post: 'Sales Representative',
      email: 'dfalloona@ifeng.com',
      city: 'Colima',
      start_date: '06/12/2018',
      salary: 19252.12,
      age: 30,
      experience: '0 Year',
      status: 4
    },
    {
      id: 3,
      avatar: '7.png',
      fullName: 'Stella Ganderton',
      post: 'Operator',
      email: 'sganderton2@tuttocitta.it',
      city: 'Golcowa',
      start_date: '03/24/2018',
      salary: 13076.28,
      age: 66,
      experience: '6 Years',
      status: 5
    },
    {
      id: 5,
      avatar: '',
      fullName: 'Harmonia Nisius',
      post: 'Senior Cost Accountant',
      email: 'hnisius4@gnu.org',
      city: 'Lucan',
      start_date: '08/25/2017',
      salary: 10909.52,
      age: 33,
      experience: '3 Years',
      status: 2
    },
    {
      id: 6,
      avatar: '',
      fullName: 'Genevra Honeywood',
      post: 'Geologist',
      email: 'ghoneywood5@narod.ru',
      city: 'Maofan',
      start_date: '06/01/2017',
      salary: 17803.8,
      age: 61,
      experience: '1 Year',
      status: 1
    },
    {
      id: 4,
      avatar: '8.png',
      fullName: 'Dorolice Crossman',
      post: 'Cost Accountant',
      email: 'dcrossman3@google.co.jp',
      city: 'Paquera',
      start_date: '12/03/2017',
      salary: 12336.17,
      age: 22,
      experience: '2 Years',
      status: 2
    },
    {
      id: 8,
      avatar: '7.png',
      fullName: 'Richardo Aldren',
      post: 'Senior Sales Associate',
      email: 'raldren7@mtv.com',
      city: 'Skoghall',
      start_date: '11/05/2016',
      salary: 19230.13,
      age: 55,
      experience: '5 Years',
      status: 3
    },
    {
      id: 9,
      avatar: '2.png',
      fullName: 'Allyson Moakler',
      post: 'Safety Technician',
      email: 'amoakler8@shareasale.com',
      city: 'Mogilany',
      start_date: '12/29/2018',
      salary: 11677.32,
      age: 39,
      experience: '9 Years',
      status: 5
    },
    {
      id: 10,
      avatar: '7.png',
      fullName: 'Merline Penhalewick',
      post: 'Junior Executive',
      email: 'mpenhalewick9@php.net',
      city: 'Kanuma',
      start_date: '04/19/2019',
      salary: 15939.52,
      age: 23,
      experience: '3 Years',
      status: 2
    },
    {
      id: 12,
      avatar: '',
      fullName: 'Cyrus Gornal',
      post: 'Senior Sales Associate',
      email: 'cgornalb@fda.gov',
      city: 'Boro Utara',
      start_date: '12/09/2017',
      salary: 16745.47,
      age: 22,
      experience: '2 Years',
      status: 4
    },
    {
      id: 13,
      avatar: '',
      fullName: 'Tallou Balf',
      post: 'Staff Accountant',
      email: 'tbalfc@sina.com.cn',
      city: 'Siliana',
      start_date: '01/21/2016',
      salary: 15488.53,
      age: 36,
      experience: '6 Years',
      status: 4
    },
    {
      id: 14,
      avatar: '',
      fullName: 'Othilia Extill',
      post: 'Associate Professor',
      email: 'oextilld@theatlantic.com',
      city: 'Brzyska',
      start_date: '02/01/2016',
      salary: 18442.34,
      age: 43,
      experience: '3 Years',
      status: 2
    },
    {
      id: 15,
      avatar: '',
      fullName: 'Wilmar Bourton',
      post: 'Administrative Assistant',
      email: 'wbourtone@sakura.ne.jp',
      city: 'Bích Động',
      start_date: '04/25/2018',
      salary: 13304.45,
      age: 19,
      experience: '9 Years',
      status: 5
    },
    {
      id: 16,
      avatar: '4.png',
      fullName: 'Robinson Brazenor',
      post: 'General Manager',
      email: 'rbrazenorf@symantec.com',
      city: 'Gendiwu',
      start_date: '12/23/2017',
      salary: 11953.08,
      age: 66,
      experience: '6 Years',
      status: 5
    },
    {
      id: 17,
      avatar: '',
      fullName: 'Nadia Bettenson',
      post: 'Environmental Tech',
      email: 'nbettensong@joomla.org',
      city: 'Chabařovice',
      start_date: '07/11/2018',
      salary: 20484.44,
      age: 64,
      experience: '4 Years',
      status: 1
    },
    {
      id: 18,
      avatar: '',
      fullName: 'Titus Hayne',
      post: 'Web Designer',
      email: 'thayneh@kickstarter.com',
      city: 'Yangon',
      start_date: '05/25/2019',
      salary: 16871.48,
      age: 59,
      experience: '9 Years',
      status: 1
    },
    {
      id: 19,
      avatar: '4.png',
      fullName: 'Roxie Huck',
      post: 'Administrative Assistant',
      email: 'rhucki@ed.gov',
      city: 'Polýkastro',
      start_date: '04/04/2019',
      salary: 19653.56,
      age: 41,
      experience: '1 Year',
      status: 4
    },
    {
      id: 20,
      avatar: '7.png',
      fullName: 'Latashia Lewtey',
      post: 'Actuary',
      email: 'llewteyj@sun.com',
      city: 'Hougong',
      start_date: '08/03/2017',
      salary: 18303.87,
      age: 35,
      experience: '5 Years',
      status: 1
    },
    {
      id: 21,
      avatar: '',
      fullName: 'Natalina Tyne',
      post: 'Software Engineer',
      email: 'ntynek@merriam-webster.com',
      city: 'Yanguan',
      start_date: '03/16/2019',
      salary: 15256.4,
      age: 30,
      experience: '0 Year',
      status: 2
    },
    {
      id: 22,
      avatar: '',
      fullName: 'Faun Josefsen',
      post: 'Analog Circuit Design manager',
      email: 'fjosefsenl@samsung.com',
      city: 'Wengyang',
      start_date: '07/08/2017',
      salary: 11209.16,
      age: 40,
      experience: '0 Year',
      status: 3
    },
    {
      id: 23,
      avatar: '7.png',
      fullName: 'Rosmunda Steed',
      post: 'Assistant Media Planner',
      email: 'rsteedm@xing.com',
      city: 'Manzanares',
      start_date: '12/23/2017',
      salary: 13778.34,
      age: 21,
      experience: '1 Year',
      status: 5
    },
    {
      id: 24,
      avatar: '',
      fullName: 'Scott Jiran',
      post: 'Graphic Designer',
      email: 'sjirann@simplemachines.org',
      city: 'Pinglin',
      start_date: '05/26/2016',
      salary: 23081.71,
      age: 23,
      experience: '3 Years',
      status: 1
    },
    {
      id: 25,
      avatar: '',
      fullName: 'Carmita Medling',
      post: 'Accountant',
      email: 'cmedlingo@hp.com',
      city: 'Bourges',
      start_date: '07/31/2019',
      salary: 13602.24,
      age: 47,
      experience: '7 Years',
      status: 3
    },
    {
      id: 26,
      avatar: '2.png',
      fullName: 'Morgen Benes',
      post: 'Senior Sales Associate',
      email: 'mbenesp@ted.com',
      city: 'Cà Mau',
      start_date: '04/10/2016',
      salary: 16969.63,
      age: 42,
      experience: '2 Years',
      status: 4
    },
    {
      id: 27,
      avatar: '',
      fullName: 'Onfroi Doughton',
      post: 'Civil Engineer',
      email: 'odoughtonq@aboutads.info',
      city: 'Utrecht (stad)',
      start_date: '09/29/2018',
      salary: 23796.62,
      age: 28,
      experience: '8 Years',
      status: 3
    },
    {
      id: 28,
      avatar: '',
      fullName: 'Kliment McGinney',
      post: 'Chief Design Engineer',
      email: 'kmcginneyr@paginegialle.it',
      city: 'Xiaocheng',
      start_date: '07/09/2018',
      salary: 24027.81,
      age: 28,
      experience: '8 Years',
      status: 4
    },
    {
      id: 29,
      avatar: '',
      fullName: 'Devin Bridgland',
      post: 'Tax Accountant',
      email: 'dbridglands@odnoklassniki.ru',
      city: 'Baoli',
      start_date: '07/17/2016',
      salary: 13508.15,
      age: 48,
      experience: '8 Years',
      status: 3
    },
    {
      id: 30,
      avatar: '6.png',
      fullName: 'Gilbert McFade',
      post: 'Biostatistician',
      email: 'gmcfadet@irs.gov',
      city: 'Deje',
      start_date: '08/28/2018',
      salary: 21632.3,
      age: 20,
      experience: '0 Year',
      status: 2
    },
    {
      id: 31,
      avatar: '',
      fullName: 'Teressa Bleakman',
      post: 'Senior Editor',
      email: 'tbleakmanu@phpbb.com',
      city: 'Žebrák',
      start_date: '09/03/2016',
      salary: 24875.41,
      age: 37,
      experience: '7 Years',
      status: 5
    },
    {
      id: 32,
      avatar: '',
      fullName: 'Marcelia Alleburton',
      post: 'Safety Technician',
      email: 'malleburtonv@amazon.com',
      city: 'Basail',
      start_date: '06/02/2016',
      salary: 23888.98,
      age: 53,
      experience: '3 Years',
      status: 2
    },
    {
      id: 33,
      avatar: '7.png',
      fullName: 'Aili De Coursey',
      post: 'Environmental Specialist',
      email: 'adew@etsy.com',
      city: 'Łazy',
      start_date: '09/30/2016',
      salary: 14082.44,
      age: 27,
      experience: '7 Years',
      status: 5
    },
    {
      id: 34,
      avatar: '6.png',
      fullName: 'Charlton Chatres',
      post: 'Analyst Programmer',
      email: 'cchatresx@goo.gl',
      city: 'Reguengos de Monsaraz',
      start_date: '04/07/2016',
      salary: 21386.52,
      age: 22,
      experience: '2 Years',
      status: 3
    },
    {
      id: 35,
      avatar: '1.png',
      fullName: 'Nat Hugonnet',
      post: 'Financial Advisor',
      email: 'nhugonnety@wufoo.com',
      city: 'Pimentel',
      start_date: '09/11/2019',
      salary: 13835.97,
      age: 46,
      experience: '6 Years',
      status: 4
    },
    {
      id: 36,
      avatar: '',
      fullName: 'Lorine Hearsum',
      post: 'Payment Adjustment Coordinator',
      email: 'lhearsumz@google.co.uk',
      city: 'Shuiying',
      start_date: '03/05/2019',
      salary: 22093.91,
      age: 47,
      experience: '7 Years',
      status: 4
    },
    {
      id: 37,
      avatar: '5.png',
      fullName: 'Sheila-kathryn Haborn',
      post: 'Environmental Specialist',
      email: 'shaborn10@about.com',
      city: 'Lewolang',
      start_date: '11/10/2018',
      salary: 24624.23,
      age: 51,
      experience: '1 Year',
      status: 3
    },
    {
      id: 38,
      avatar: '3.png',
      fullName: 'Alma Harvatt',
      post: 'Administrative Assistant',
      email: 'aharvatt11@addtoany.com',
      city: 'Ulundi',
      start_date: '11/04/2016',
      salary: 21782.82,
      age: 41,
      experience: '1 Year',
      status: 1
    },
    {
      id: 39,
      avatar: '2.png',
      fullName: 'Beatrix Longland',
      post: 'VP Quality Control',
      email: 'blongland12@gizmodo.com',
      city: 'Damu',
      start_date: '07/18/2016',
      salary: 22794.6,
      age: 62,
      experience: '2 Years',
      status: 2
    },
    {
      id: 40,
      avatar: '4.png',
      fullName: 'Hammad Condell',
      post: 'Project Manager',
      email: 'hcondell13@tiny.cc',
      city: 'Bulung’ur',
      start_date: '11/04/2018',
      salary: 10872.83,
      age: 37,
      experience: '7 Years',
      status: 4
    },
    {
      id: 41,
      avatar: '',
      fullName: 'Parker Bice',
      post: 'Technical Writer',
      email: 'pbice14@ameblo.jp',
      city: 'Shanlian',
      start_date: '03/02/2016',
      salary: 17471.92,
      age: 65,
      experience: '5 Years',
      status: 5
    },
    {
      id: 42,
      avatar: '',
      fullName: 'Lowrance Orsi',
      post: 'Biostatistician',
      email: 'lorsi15@wp.com',
      city: 'Dengteke',
      start_date: '12/10/2018',
      salary: 24719.51,
      age: 64,
      experience: '4 Years',
      status: 1
    },
    {
      id: 43,
      avatar: '8.png',
      fullName: 'Ddene Chaplyn',
      post: 'Environmental Tech',
      email: 'dchaplyn16@nymag.com',
      city: 'Lattes',
      start_date: '01/23/2019',
      salary: 11958.33,
      age: 38,
      experience: '8 Years',
      status: 2
    },
    {
      id: 44,
      avatar: '',
      fullName: 'Washington Bygraves',
      post: 'Human Resources Manager',
      email: 'wbygraves17@howstuffworks.com',
      city: 'Zlaté Hory',
      start_date: '09/07/2016',
      salary: 10552.43,
      age: 37,
      experience: '7 Years',
      status: 1
    },
    {
      id: 45,
      avatar: '7.png',
      fullName: 'Meghann Bodechon',
      post: 'Operator',
      email: 'mbodechon18@1und1.de',
      city: 'Itō',
      start_date: '07/23/2018',
      salary: 23024.28,
      age: 61,
      experience: '1 Year',
      status: 4
    },
    {
      id: 46,
      avatar: '1.png',
      fullName: 'Moshe De Ambrosis',
      post: 'Recruiting Manager',
      email: 'mde19@purevolume.com',
      city: 'San Diego',
      start_date: '02/10/2018',
      salary: 10409.9,
      age: 47,
      experience: '7 Years',
      status: 5
    },
    {
      id: 47,
      avatar: '4.png',
      fullName: 'Had Chatelot',
      post: 'Cost Accountant',
      email: 'hchatelot1a@usatoday.com',
      city: 'Mercedes',
      start_date: '11/23/2016',
      salary: 11446.3,
      age: 64,
      experience: '4 Years',
      status: 4
    },
    {
      id: 48,
      avatar: '',
      fullName: 'Georgia McCrum',
      post: 'Registered Nurse',
      email: 'gmccrum1b@icio.us',
      city: 'Nggalak',
      start_date: '04/19/2018',
      salary: 14002.31,
      age: 63,
      experience: '3 Years',
      status: 1
    },
    {
      id: 49,
      avatar: '5.png',
      fullName: 'Krishnah Stilldale',
      post: 'VP Accounting',
      email: 'kstilldale1c@chronoengine.com',
      city: 'Slavs’ke',
      start_date: '03/18/2017',
      salary: 10704.29,
      age: 56,
      experience: '6 Years',
      status: 1
    },
    {
      id: 50,
      avatar: '4.png',
      fullName: 'Mario Umbert',
      post: 'Research Assistant',
      email: 'mumbert1d@digg.com',
      city: 'Chorotis',
      start_date: '05/13/2019',
      salary: 21813.54,
      age: 43,
      experience: '3 Years',
      status: 1
    },
    {
      id: 95,
      avatar: '2.png',
      fullName: 'Edwina Ebsworth',
      post: 'Human Resources Assistant',
      email: 'eebsworth2m@sbwire.com',
      city: 'Puzi',
      start_date: '09/27/2018',
      salary: 19586.23,
      age: 27,
      experience: '2 Years',
      status: 1
    }
  ]
  

// Column Definitions
const columnHelper = createColumnHelper()

const fuzzyFilter = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}

// A debounced input react component
const DebouncedInput = ({ value: initialValue, onChange, debounce = 500, ...props }) => {
  // States
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])
  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return <CustomTextField {...props} value={value} onChange={e => setValue(e.target.value)} />
}

const KitchenSink = () => {
  // States
  const [columnFilters, setColumnFilters] = useState([])
  const [globalFilter, setGlobalFilter] = useState('')

  const [data, setData] = useState(() => defaultData)

  // Hooks
  const columns = useMemo(
    () => [
      columnHelper.accessor('fullName', {
        cell: info => info.getValue(),
        header: 'Name'
      }),
      columnHelper.accessor('email', {
        cell: info => info.getValue(),
        header: 'Email'
      }),
      columnHelper.accessor('start_date', {
        cell: info => info.getValue(),
        header: 'Date'
      }),
      columnHelper.accessor('experience', {
        cell: info => info.getValue(),
        header: 'Experience'
      }),
      columnHelper.accessor('age', {
        cell: info => info.getValue(),
        header: 'Age'
      })
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter
    },
    state: {
      columnFilters,
      globalFilter
    },
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues()
  })

  useEffect(() => {
    if (table.getState().columnFilters[0]?.id === 'fullName') {
      if (table.getState().sorting[0]?.id !== 'fullName') {
        table.setSorting([{ id: 'fullName', desc: false }])
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table.getState().columnFilters[0]?.id])

  return (
    <Card>
      <CardHeader
        title='Kitchen Sink'
        action={
          <DebouncedInput
            value={globalFilter ?? ''}
            onChange={value => setGlobalFilter(String(value))}
            placeholder='Search all columns...'
          />
        }
      />
      <div className='overflow-x-auto'>
        <table className={styles.table}>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <th key={header.id}>
                      {header.isPlaceholder ? null : (
                        <>
                          <div
                            className={classnames({
                              'flex items-center': header.column.getIsSorted(),
                              'cursor-pointer select-none': header.column.getCanSort()
                            })}
                            onClick={header.column.getToggleSortingHandler()}
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {{
                              asc: <ChevronRight fontSize='1.25rem' className='-rotate-90' />,
                              desc: <ChevronRight fontSize='1.25rem' className='rotate-90' />
                            }[header.column.getIsSorted()] ?? null}
                          </div>
                          
                        </>
                      )}
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>
          {table.getFilteredRowModel().rows.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan={table.getVisibleFlatColumns().length} className='text-center'>
                  No data available
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {table.getRowModel().rows.map(row => {
                return (
                  <tr key={row.id}>
                    {row.getVisibleCells().map(cell => {
                      return <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                    })}
                  </tr>
                )
              })}
            </tbody>
          )}
        </table>
      </div>
      <TablePagination
        component={() => <TablePaginationComponent table={table} />}
        count={table.getFilteredRowModel().rows.length}
        rowsPerPage={table.getState().pagination.pageSize}
        page={table.getState().pagination.pageIndex}
        onPageChange={(_, page) => {
          table.setPageIndex(page)
        }}
      />
    </Card>
  )
}
 
export default KitchenSink
